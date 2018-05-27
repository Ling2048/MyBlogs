const webpack = require('webpack');
const withCSS = require('@zeit/next-css')
module.exports = withCSS();
module.exports = {
  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.(less)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.less$/,
        use: ['babel-loader', 'raw-loader', {
          loader: 'less-loader', 
          options: {
             javascriptEnabled: true
            }
        }]
      }
    );
    config.plugins.push(
        new webpack.DefinePlugin({
            __DEV__: false
        })
    );
    return config;
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    console.log(config);
    // Important: return the modified config
    return config
  }
};