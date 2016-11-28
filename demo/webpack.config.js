var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var isDeploy = process.env.NODE_ENV === 'production';
var config = {
    entry : {
        test : isDeploy ? path.resolve(__dirname,'test.jsx') : [
                'webpack/hot/dev-server',
                'webpack-dev-server/client?http://localhost:7909',
                path.resolve(__dirname,'test.jsx')
            ]
    },
    output : {
        path : path.resolve(__dirname, '../demo'),
        filename : '[name].js'
    },
    module : {
        loaders : [{
            test : /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015', 'babel-preset-stage-2']
            }
        },
        {
            test: /\.(css|less)$/,
            loader: ExtractTextPlugin.extract('style', '!css!less!postcss')
        }]
    },
    resolve: {
        extensions: ['','.jsx','.js']
    },
    devtool: isDeploy ? false : 'eval-source-map',
    jshint : {
        "esnext" : true
    },
    postcss : function(){
        return [require('autoprefixer')({
            browsers:['IOS >= 6.0', 'Android >= 4.0']
        }), require('precss')];
    }
}
if(isDeploy){
    config.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.UglifyJsPlugin({
           compress: {
               warnings: false
           }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
    ];
}
else{
    config.plugins = [
        new ExtractTextPlugin("[name].css")
    ] 
}

module.exports = config;