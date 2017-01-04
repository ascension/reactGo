import express from 'express';
import webpack from 'webpack';
import { ENV } from './config/appConfig';
import { connect, session as dbSession } from './db';
import { sessionSecret } from './config/secrets';
import passportConfig from './config/passport';
import expressConfig from './config/express';
import routesConfig from './config/routes';
const App = require('../public/assets/server');
const app = express();
import http from 'http';
import LedgerService from './services/LedgerService';

import socket from './utils/socket';

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

socket(server);

server.listen(app.get('port'));
