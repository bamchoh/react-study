const HtmlWebPackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")
const path = require('path');

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000"
      }
    },
    contentBase: [path.resolve(__dirname, "public/")],
    historyApiFallback: {
      index: 'index.html'
    }
  },

  entry: "./src/index.tsx",

  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "public/")
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "awesome-typescript-loader"
        }
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new FaviconsWebpackPlugin({
      logo: './src/favicon.png',
      title: 'TODO Apps',
      background: '#ff0000',
    }),
  ]
};
