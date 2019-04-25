var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var merge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.config.js');

webpackBaseConfig.plugin = [];

module.exports = merge(webpackBaseConfig,{
	output: {
		publicPath: '/dist/',
		filename: '[name].[hash].js'
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
			allChunks: true
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new HtmlwebpackPlugin({
			filename: '../index_prod.html',
			template: './index.ejs',
			inject: false
		})
	]
});
