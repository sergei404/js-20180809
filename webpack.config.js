const path = require('path');

module.exports = {
  mode: 'none',
  entry: './scripts/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'build.js'
  },
  devtool: 'source-map',
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  }
};
