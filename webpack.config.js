const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",

  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
<<<<<<< HEAD
        test: /\.tsx?$/,
=======
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
>>>>>>> 4c3eef2afef03b8ae0892b55d37e32a6f7304c85
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
