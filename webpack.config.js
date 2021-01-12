const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'web',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  devServer: {
    hot: true,
    port: 8080,
<<<<<<< HEAD
    proxy: { '/': 'http://localhost:3000' },
=======
    proxy: {
      '/': 'http://localhost:3000/',
    },
>>>>>>> a217e196332eabf42974eabbbcffebdaad2a3ffa
    publicPath: '/build',
  },
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        exclude: /(node_modules)/,
        include: [path.resolve(__dirname, 'src')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        resolve: {
          extensions: ['.js', '.jsx', '.json'],
        },
      },
    ],
  },
};
