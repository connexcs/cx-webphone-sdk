var webpack = require('webpack');
var JsDocPlugin = require('jsdoc-webpack-plugin');
 
// module.exports = {
    // /// ... rest of config
// }

const path = require('path');

module.exports = {
	entry: './src/cxWebphone.js',
    plugins: [
        new JsDocPlugin({
            conf: '.jsdoc.json',
            cwd: './',
//            preserveTmpFile: false,
//            recursive: false
        })
    ],
	output: {
		filename: 'cx-webphone-sdk.js',
		path: path.resolve(__dirname, 'dist'),
		library: 'cxWebphone',
		jsonpScriptType: 'text/javascript'
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9090
	},
	mode: 'production'
};