const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  watch: false,
  mode: "development",
  entry: {
    index: "./src/index.js",
    login: "./src/login.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
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
  ],
};
