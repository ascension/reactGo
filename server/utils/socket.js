var socket_io = require('socket.io');
var passportSocketIo = require("passport.socketio");
var cookieParser = require('cookie-parser');
import { session as dbSession } from '../db';
import { sessionSecret } from '../config/secrets';
import GameManager from './GameManager';
import LedgerService from '../services/LedgerService';

const Models = require('../db/sequelize/models');
const Message = Models.Message;

const ADD_MESSAGE = 'server/ADD_MESSAGE';
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const JOIN_GAME_SUCCESS = 'server/JOIN_GAME_SUCCESS';
const NOT_ENOUGH_BALANCE = 'NOT_ENOUGH_BALANCE';
const UPDATE_USER_BALANCE = 'UPDATE_USER_BALANCE';

// var ioCookieParser = require('socket.io-cookie');
var restartTime = 5000; // How long from  game_starting -> game_started
const ledgerService = new LedgerService();

class Game {
  constructor(socket, gameId) {
    this.state = 'NOT_STARTED';
    this.socket = socket;
    this.gameId = gameId;
    this.socket.to('joined').emit(event, data);
  }
}

let game_count = 3;

let connectedUsers = 0;

function chatActions(action, clientSocket) {
  if (action.type === ADD_MESSAGE) {
    console.log('Chat Message: ', action.message);

    const messageToCreate = Object.assign({}, {
      text: action.message.text,
      userId: clientSocket.request.user.id,
      channelId: action.channelId
    });
    return Message.create(messageToCreate)
      .then((newMessage) => {
        Message.find({
          where: {
            id: newMessage.id
          },
          include: [{
            model: Models.Channel
          },{
            model: Models.User
          }]
        })
        .then((foundMessage) => {
          const message = {
            channel: foundMessage.Channel.name,
            id: foundMessage.id,
            text: foundMessage.text,
            User: { username: foundMessage.User.username , isMod: false, isAdmin: false },
            time: foundMessage.createdAt
          };
          // relay message to other clients
          clientSocket.broadcast.emit("action", { type: RECEIVE_MESSAGE, message: message });
        });
      });
  }
}

function gameActions(action, clientSocket) {
  console.log('GameActions', action);
  if (action.type === 'server/JOIN_GAME') {
    console.log(`User: ${clientSocket.request.user.id} Joining Game: ${action.gameId}`);
    return gameManager.userJoinGame(clientSocket.request.user, action.betAmount, action.gameId)
      .then((gamePlay) => {
        gameManager.getGame(action.gameId)
          .then((game) => {
            clientSocket.request.user.reload().then(() => {
              clientSocket.emit('action', { type: UPDATE_USER_BALANCE, user: clientSocket.request.user });
            });

            io.emit("action", { type: JOIN_GAME_SUCCESS, game });
            clientSocket.emit('#navigate', '/game/' + action.gameId);
          });
      })
      .catch((error) => {
        clientSocket.emit('action', { type: NOT_ENOUGH_BALANCE, message: 'Not enough balance.' });
        console.log('Join Game Error: ', error);
      });
    // socket.emit('action', {type: 'server/JOIN_GAME_SUCCESS'})
  }
}

var io = socket_io();
let sessionStore = dbSession();
const gameManager = new GameManager(io);

var SocketManager = function() {
  this.sockets = {};
  this.onAuthorizeSuccess = this.onAuthorizeSuccess.bind(this);
  this.onAuthorizeFail = this.onAuthorizeFail.bind(this);
};

SocketManager.prototype.onAuthorizeSuccess = function(clientSocket, accept) {
  console.log('successful connection to socket.io');

  // The accept-callback still allows us to decide whether to
  // accept the connection or not.
  // accept(null, true);

  // OR

  // If you use socket.io@1.X the callback looks different
  if (clientSocket.isAuthenticated()) {
    accept();
  }
};

function onAuthorizeSuccess(data, accept){
  console.log('successful connection to socket.io');

  // The accept-callback still allows us to decide whether to
  // accept the connection or not.
  // accept(null, true);

  // OR

  // If you use socket.io@1.X the callback looks different
  accept();
}

SocketManager.prototype.onAuthorizeFail = function(data, message, error, accept){
  if(error)
    throw new Error(message);
  console.log('failed connection to socket.io:', message);

  // We use this callback to log all of our failed connections.
  // accept(null, false);

  // OR

  // If you use socket.io@1.X the callback looks different
  // If you don't want to accept the connection
  if(error)
    accept(new Error(message));
  // this error will be sent to the user as a special error-package
  // see: http://socket.io/docs/client-api/#socket > error-object
}

var socketManager = new SocketManager();

io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,       // the same middleware you registrer in express
  key:          'sessionId',       // the name of the cookie where express/connect stores its session_id
  secret:       sessionSecret,    // the session_secret to parse the cookie
  store:        sessionStore,        // we NEED to use a sessionstore. no memorystore please
  success:      socketManager.onAuthorizeSuccess,  // *optional* callback on success - read more below
  fail:         socketManager.onAuthorizeFail,     // *optional* callback on fail/error - read more below
}));

export default function(server) {
  var sockets = {};

  console.log('setting up socket');
  io.attach(server);
  connectToBitcoinD();
  io.on('connection', onConnection.bind(this));
  io.on('disconnect', onDisconnect.bind(this));

  function onDisconnect(socket) {
    connectedUsers--;
    console.log('Socket Disconnected: ', socket.id);
  }
  
  function onConnection(clientSocket) {
    if (clientSocket.request.isAuthenticated())
      sockets[clientSocket.request.user.id] = sockets[clientSocket.request.user.id] ? [...sockets[clientSocket.request.user.id], clientSocket.id]  : [clientSocket.id];
    // console.log('onConnection: ', clientSocket.request.isAuthenticated());
    // console.log('onConnection: ', clientSocket.request.user);

    io.to(clientSocket.id).emit('TESTING: ' + clientSocket.id);
    console.log('sockets: ', sockets);
    clientSocket.on('action', (action, ack) => {
      if (clientSocket.request.isAuthenticated()) {
        clientSocket.join('chat');
        clientSocket.join('games');

        gameActions(action, clientSocket);
        chatActions(action, clientSocket);

        console.log('User is authed!');
      } else {
        console.log('User is...!');
      }
    });
  };

  function connectToBitcoinD() {
    var other_server = require("socket.io-client")('http://192.34.61.117:8099');

    other_server.on("connect", function(){
      console.log('** Connected to Bitcoind **');
      other_server.on('new-block', function(deposits){
        // We received a message from Server 2
        // We are going to forward/broadcast that message to the "Lobby" room
        console.log('New Block Processed: ', deposits);
        ledgerService.processDeposits(deposits)
          .then(() => {
            Object.keys(deposits).forEach(function(userId){
              var amount = deposits[userId]['amount'];
              if (sockets[userId]) {
                sockets[userId].forEach(function (socketId) {
                  console.log('emitting to: ', socketId);
                  io.to(socketId).emit('action', { type: 'DEPOSIT_ALERT', message: 'Deposit Successful: ' + amount + ' bits has been added to your balance.' });
                })
              }
            });
          });
      });
    });
  }


}