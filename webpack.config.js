module.exports = {
  context: __dirname + '/src',
  entry: {
    app: './app.jsx',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js',
  },
  devServer: {
    contentBase: __dirname + '/src',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.json$/,
        use: [{
          loader: 'json-loader',
        }],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
};
