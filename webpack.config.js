const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "styles.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader"
        ]
      }
    ]
  },
  devtool: 'source-map'
};
