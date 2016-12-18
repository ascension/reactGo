var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var assetsPath = path.join(__dirname, '..', 'public', 'assets');

var commonLoaders = [
  {
    /*
     * TC39 categorises proposals for babel in 4 stages
     * Read more http://babeljs.io/docs/usage/experimental/
     */
    test: /\.js$|\.jsx$|\.es6$/,
    loader: 'babel-loader',
    // Reason why we put this here instead of babelrc
    // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
    query: {
      presets: ['es2015', 'react', 'stage-0'],
      plugins: ['transform-decorators-legacy']
    },
    include: path.join(__dirname, '..', 'app'),
    exclude: path.join(__dirname, '..', 'node_modules')
  },
  {test: /\.json$/, loader: 'json-loader'},
  {
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
    loader: 'url',
    query: {
      name: '[hash].[ext]',
      limit: 10000,
    }
  },
  {
    test: /\.scss$/,
    exclude: /node_modules/,
    include: /main.scss/,
    loader: 'style!css!sass'
  },
  {test: /\.html$/, loader: 'html-loader'}
];

module.exports = {
  // The configuration for the server-side rendering
  name: 'server-side rendering',
  context: path.join(__dirname, '..', 'app'),
  entry: {
    server: './server'
  },
  target: 'node',
  output: {
    // The output directory as absolute path
    path: assetsPath,
    // The filename of the entry chunk as relative path inside the output.path directory
    filename: 'server.js',
    // The output path from the view of the Javascript
    publicPath: '/assets/',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: commonLoaders.concat([
      {
        test: /\.css$/,
        loader: 'css/locals?module&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      {
        test: /\.scss$/,
        exclude: /main.scss/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?' +
          'modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' +
          '!sass')
      },

    ])
  },
  resolve: {
    root: [path.join(__dirname, '..', 'app')],
    extensions: ['', '.js', '.jsx', '.scss'],
  },
  plugins: [
    new ExtractTextPlugin('app.css'),
    new webpack.DefinePlugin({
      __DEVCLIENT__: false,
      __DEVSERVER__: true
    }),
    new webpack.IgnorePlugin(/vertx/)
  ]
};
