const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BrowserExtensionPlugin = require("extension-build-webpack-plugin");

module.exports = {
	entry: {
		popup: "./src/popup/index.tsx",
		background: "./src/background.ts",
		contentScript: "./src/contentScript.ts",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
		],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: "public", to: "." }, // Copy manifest.json and any static files
			],
		}),
		new BrowserExtensionPlugin({
			devMode: true,
			name: "nocookiesplease.zip",
			directory: "dist",
			updateType: "minor",
		}),
	],
};
