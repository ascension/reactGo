var socket_io = require('socket.io');

var restartTime = 5000; // How long from  game_starting -> game_started


export default function(server) {
  var io = socket_io();
  io.attach(server);
  io.on('connection', function(socket){
    console.log("Socket connected: " + socket.id);
    socket.on('action', (action) => {
      if(action.type === 'server/hello'){
        console.log('Got hello data!', action.data);
        socket.emit('action', {type:'message', data:'good day!'});
      }

      if(action.type === 'server/CREATE_TOPIC_REQUEST'){
        console.log('Got CREATE_TOPIC_REQUEST!', action.data);
        socket.emit('action', {type:'message', data:'good day!'});
      }
    });

    socket.on('create_game', (game) => {
      // TODO - Create Game in Database
      const created_game = 123;
      socket.emit('game_starting', { game_id: created_game, time_till_start: restartTime });

      setTimeout(blockGame, restartTime);
    });

    function blockGame() {
      self.state = 'BLOCKING'; // we're waiting for pending bets..

      loop();
      function loop() {
        if (self.pendingCount > 0) {
          console.log('Delaying game by 100ms for ', self.pendingCount , ' joins');
          return setTimeout(loop, 100);
        }
        startGame();
      }
    }
  });
}