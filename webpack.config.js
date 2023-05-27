/**
 * Webpack Configuration
 *
 * This module exports the configuration object for Webpack, which specifies
 * how to bundle and build the application's source code. It uses TypeScript
 * for transpiling TypeScript files, sets up the resolution for various file
 * extensions, and applies the necessary loaders and plugins.
 */

const webpack = require("webpack");

module.exports = {
  // Entry point for the application
  entry: "./src/index.tsx",

  // Resolve file extensions
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  // Module rules for transpiling TypeScript files
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },

  // Plugins for environment configuration
  plugins: [
    // Plugin to define environment variables
    new webpack.EnvironmentPlugin({
      PORT: "3000",
    }),
  ],
};
