const webpack = require("webpack");

module.exports = function override(config, env) {
  // Add polyfills for Node.js core modules
  config.resolve.fallback = {
    path: require.resolve("path-browserify"),
    os: require.resolve("os-browserify/browser"),
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    process: require.resolve("process/browser"),
    buffer: require.resolve("buffer/"),
    util: require.resolve("util/"),
    url: require.resolve("url/"),
  };
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  });
  // Ensure the 'process' polyfill is correctly provided
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  return config;
};
