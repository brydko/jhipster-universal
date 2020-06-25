const webpack = require('webpack');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = (config, options) => {
  // RULES
  if (config.mode === 'development') {
    config.module.rules.push({
      test: /\.(j|t)s$/,
      enforce: 'pre',
      loader: 'eslint-loader',
      exclude: /node_modules/,
    });
  }

  // STATS
  if (config.mode === 'development') {
    config.stats = 'minimal';
  }

  // PLUGINS
  if (config.mode === 'development') {
    config.plugins.push(
      new FriendlyErrorsWebpackPlugin(),
      new BrowserSyncPlugin(
        {
          https: false,
          host: 'localhost',
          port: 9000,
          proxy: {
            target: `http://localhost:4200`,
            proxyOptions: {
              changeOrigin: false, //pass the Host header to the backend unchanged  https://github.com/Browsersync/browser-sync/issues/430
            },
          },
          socket: {
            clients: {
              heartbeatTimeout: 60000,
            },
          },
        },
        {
          reload: false,
        }
      )
    );

    if (!process.env.JHI_DISABLE_WEBPACK_LOGS) {
      config.plugins.push(
        new SimpleProgressWebpackPlugin({
          format: 'compact',
        })
      );
    }
  }

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TIMESTAMP: `'${new Date().getTime()}'`,
        // APP_VERSION is passed as an environment variable from the Gradle / Maven build tasks.
        VERSION: `'${process.env.hasOwnProperty('APP_VERSION') ? process.env.APP_VERSION : 'DEV'}'`,
        DEBUG_INFO_ENABLED: true,
        // The root URL for API calls, ending with a '/' - for example: `"https://www.jhipster.tech:8081/myservice/"`.
        // If this URL is left empty (""), then it will be relative to the current context.
        // If you use an API server, in `prod` mode, you will need to enable CORS
        // (see the `jhipster.cors` common JHipster property in the `application-*.yml` configurations)
        SERVER_API_URL: `''`,
      },
    })
  );

  return config;
};
