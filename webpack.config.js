const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader')
var webpack = require('webpack')

var config = {
	entry: {
		main: './main'
	},
	output: {
		path: path.join(__dirname,'./dist'),
		publicPath: '/dist/',
		filename: 'main.js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(c|le)ss$/,
				use: ['style-loader','css-loader','less-loader'],
			},
			{
				test: /\.(gif|jpg|png|woff|svg|eot|ttf|mp4)\??.*$/, 
				loader: 'url-loader' 
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename:"[id].css",
			allChunks: true
		}),
		new VueLoaderPlugin(),
		new webpack.ProvidePlugin({
	    $: "jquery",
	    jQuery: "jquery"
	  })
	]
};

module.exports = config;