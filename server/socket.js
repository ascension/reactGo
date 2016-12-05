var socket_io = require('socket.io');
var passportSocketIo = require("passport.socketio");
var cookieParser = require('cookie-parser');
import { session as dbSession } from '../server/db';
import { sessionSecret } from '../server/config/secrets';
import GameManager from './GameManager';
import { ADD_MESSAGE, RECEIVE_MESSAGE, JOIN_GAME_SUCCESS, NOT_ENOUGH_BALANCE } from '../app/types';
import Models from '../server/db/sequelize/models';
const Message = Models.Message;

// var ioCookieParser = require('socket.io-cookie');
var restartTime = 5000; // How long from  game_starting -> game_started


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
        io.to('chat').emit('chat', {msg: 'jerrod has joined the game.', userName: 'Jerrod'});
        gameManager.getGame(action.gameId)
          .then((game) => {
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


io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,       // the same middleware you registrer in express
  key:          'sessionId',       // the name of the cookie where express/connect stores its session_id
  secret:       sessionSecret,    // the session_secret to parse the cookie
  store:        sessionStore,        // we NEED to use a sessionstore. no memorystore please
  success:      onAuthorizeSuccess,  // *optional* callback on success - read more below
  fail:         onAuthorizeFail,     // *optional* callback on fail/error - read more below
}));

function onAuthorizeSuccess(data, accept){
  console.log('successful connection to socket.io');

  // The accept-callback still allows us to decide whether to
  // accept the connection or not.
  // accept(null, true);

  // OR

  // If you use socket.io@1.X the callback looks different
  accept();
}

function onAuthorizeFail(data, message, error, accept){
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

export default function(server) {
  console.log('setting up socket');
  io.attach(server);

  io.on('connection', onConnection);
  io.on('disconnect', onDisconnect);

  function onDisconnect(socket) {
    connectedUsers--;
    console.log('Socket Disconnected: ', socket.id);
    console.log('connectedUsers:', connectedUsers);
  }
  
  function onConnection(clientSocket) {
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
  }
}