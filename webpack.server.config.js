const path = require('path');
const webpack = require('webpack');

module.exports = {
  // FIXME: TypeError: Right-hand side of 'instanceof' is not an object
  optimization: {
    minimize: false
  },
  entry: { server: './server.ts' },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      // FIXME: TypeError: decorator is not a function
      // '@nestjs/swagger': '@petman/common/dist/mock/package',
      // FIXME: @petman/common -> @nest/common -> axios which have conflict with xmlhttprequest
      'axios': '@petman/common/dist/mock/package',
      'materialize-css': '@petman/common/dist/mock/package'
    }
  },
  target: 'node',
  // this makes sure we include node_modules and other 3rd party libraries
  externals: [/(node_modules|main\..*\.js)/],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
    // for "WARNING Critical dependency: the request of a dependency is an expression"
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    )
  ]
};
