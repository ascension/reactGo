import express from 'express';
import webpack from 'webpack';
import { ENV } from './config/appConfig';
import { connect } from './db';
import passportConfig from './config/passport';
import expressConfig from './config/express';
import routesConfig from './config/routes';
const App = require('../public/assets/server');
const app = express();
import http from 'http';

import socket from './socket';


/*
 * Database-specific setup
 * - connect to MongoDB using mongoose
 * - register mongoose Schema
 */
connect();

/*
 * REMOVE if you do not need passport configuration
 */
passportConfig();

if (ENV === 'development') {
  const webpackDevConfig = require('../webpack/webpack.config.dev-client');
  const compiler = webpack(webpackDevConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackDevConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

/*
 * Bootstrap application settings
 */
expressConfig(app);

/*
 * REMOVE if you do not need any routes
 *
 * Note: Some of these routes have passport and database model dependencies
 */
routesConfig(app);

/*
 * This is where the magic happens. We take the locals data we have already
 * fetched and seed our stores with data.
 * App is a function that requires store data and url
 * to initialize and return the React-rendered html string
 */
app.get('*', App.default);
var server = http.createServer(app);

let game_count = 2;

let games = [];

function createGame() {
  return {
    id: game_count++,
    status: 'NOT_STARTED',
    playerCount: 5,
    remainingLobbyTime: 60,
    timeTillRoll: 10
  };
}

socket(server);

// io.attach(server);
// io.on('connection', function(socket){
//   console.log("Socket connected: " + socket.id);
//   socket.on('action', (action) => {
//     if(action.type === 'server/hello'){
//       console.log('Got hello data!', action.data);
//       games.push(createGame());
//       socket.emit('action', {type:'CREATE_GAME',
//         games: games
//       });
//     }
//   });
// });

server.listen(3000);

// app.listen(app.get('port'));
