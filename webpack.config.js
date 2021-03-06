// eslint-disable-next-line import/no-extraneous-dependencies
const path = require("path");
const SizePlugin = require("size-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  devtool: "source-map",
  stats: "errors-only",
  entry: {
    "shweta-on-meet": "./source/shweta-on-meet.js",
    "shweta-on-zoom": "./source/shweta-on-zoom.js",
  },
  output: {
    path: path.join(__dirname, "distribution"),
    filename: "[name].js",
  },
  plugins: [
    new SizePlugin(),
    new CopyWebpackPlugin([
      {
        from: "**/*",
        context: "source",
        ignore: ["*.js"],
      },
    ]),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        terserOptions: {
          mangle: true,
          compress: true,
        },
      }),
    ],
  },
};
