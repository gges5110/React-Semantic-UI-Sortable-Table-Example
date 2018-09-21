const webpack = require('webpack');
const path = require('path')

module.exports = {
  entry: {
    app: './src/App.jsx',
    vendor: ['react','react-dom','whatwg-fetch','semantic-ui-react'],
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'app.bundle.js'
  },
  devServer: {
    contentBase: './public',
    hot: true,
    port: 8000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: "vendor",
          name: "vendor",
          filename: 'vendor.bundle.js',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devtool: 'source-map'
};
