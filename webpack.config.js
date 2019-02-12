const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000"
      }
    },
    historyApiFallback: {
      index: 'index.html'
    }
  },

  entry: "./src/index.tsx",

  output: {
    filename: "bundle.js",
    path: __dirname + "/public"
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
    })
  ]
};
