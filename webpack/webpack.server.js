const path = require('path');
const webpack = require('webpack');
const utils = require('./utils.js');

module.exports = {
  mode: 'none',
  entry: {
    main: './server.ts',
  },
  target: 'node',
  resolve: { 
    extensions: ['.ts', '.js'],
    alias: utils.mapTypescriptAliasToWebpackAlias() 
  },
  optimization: {
    minimize: true,
  },
  output: {
    // Puts the output at the root of the dist folder
    path: path.resolve(__dirname, '../target/classes/static/server'),
    filename: '[name].js',
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' },
      {
        // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
        // Removing this will cause deprecation warnings to appear.
        test: /(\\|\/)@angular(\\|\/)core(\\|\/).+\.js$/,
        parser: { system: true },
      },
    ],
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.resolve(__dirname, '../src/main/webapp'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.resolve(__dirname, '../src/main/webapp'),
      {}
    )
  ],
};
