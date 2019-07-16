const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
	const isProduction = env === 'production'
	return {
		entry: ['babel-polyfill', './src/app.tsx'],
		output: {
			path: path.resolve(__dirname, 'public', 'dist'),
			filename: 'bundle.js'
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					exclude: '/node_modules/',
					use: 'babel-loader'
				},
				{
					test: /\.s?css$/,
					use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader']
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'style.css'
			}),
		],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
		devServer: {
			contentBase: path.join(__dirname, 'public'),
			publicPath: '/dist/',
			historyApiFallback: true
		}
	};
};
