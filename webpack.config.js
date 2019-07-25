const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
	const isProduction = env === 'production'
	return {
		entry: ['babel-polyfill', path.resolve(__dirname, 'src', 'app.tsx')],
		output: {
			path: path.resolve(__dirname, 'public', 'static'),
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
		resolve: {
			extensions: [".ts", ".tsx", ".js"]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'style.css'
			}),
		],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
		devServer: {
			contentBase: path.join(__dirname, 'public'),
			publicPath: '/static/',
			historyApiFallback: true
		}
	};
};
