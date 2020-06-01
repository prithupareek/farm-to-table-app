const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv");
const webpack = require("webpack");

// call dotenv and it will return an Object with a parsed key
const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  watch: false,
  mode: "development",
  entry: {
    index: "./src/index.js",
    login: "./src/login.js",
    about: "./src/about.js",
    contact: "./src/contact.js",
    donate: "./src/donate.js",
    comingsoon: "./src/comingsoon.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|server)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      chunks: ["index"],
      filename: "index.html", //relative to root of the application
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      chunks: ["login"],
      filename: "login.html", //relative to root of the application
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      chunks: ["about"],
      filename: "about.html", //relative to root of the application
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      chunks: ["contact"],
      filename: "contact.html", //relative to root of the application
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      chunks: ["donate"],
      filename: "donate.html", //relative to root of the application
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      chunks: ["comingsoon"],
      filename: "comingsoon.html", //relative to root of the application
    }),
  ],
};
