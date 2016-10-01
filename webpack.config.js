module.exports = {
  entry: "./src/app/entry.js",
  output: {
      path: __dirname + '/build',
      filename: "app.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  }
};
