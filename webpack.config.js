/** @format */

//Webpack uses this to work with directories
const path = require("path");

// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
module.exports = {
  // Path to your entry point. From this file Webpack will begin its work
  entry: "./models/index.js",

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  //   output: {
  //     path: path.resolve(__dirname, "dist"),
  //     publicPath: "",
  //     filename: "bundle.js",
  //   },

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on the final bundle. For now, we don't need production's JavaScript
  // minifying and other things, so let's set mode to development
  mode: "development",
  resolve: {
    fallback: {
      path: false,
      buffer: false,
      crypto: false,
      zlib: false,
      stream: false,
      https: false,
      http: false,
      fs: false,
      child_process: false,
      net: false,
      tls: false,
      dns: false,
      nock: false,
      "aws-sdk": false,
      constants: false,
      "mock-aws-s3": false,
      async_hooks: false,
    },
  },
};
