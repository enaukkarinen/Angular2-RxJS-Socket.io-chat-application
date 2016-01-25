
var CopyWebpackPlugin  = require('copy-webpack-plugin');
var HtmlWebpackPlugin  = require('html-webpack-plugin');

/*
 * Config
 */
module.exports = {
    // for faster builds use 'eval'
    debug: true,
    watch: true,
    devServer: {
        port: 8001,
        contentBase: "./dist",
    },
  
    // our angular app
    entry: { 'vendor': './src/vendor.ts', 'main': './src/main.ts' },
    devtool: 'source-map',
    // Config for our build files
    output: {
    path: root('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
    },


    resolve: { extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'] },// Add `.ts` and `.tsx` as a resolvable extension. 
    module: {
    loaders: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { 
            test: /\.tsx?$/, 
            loader: 'ts-loader',  
            query: {
            'ignoreDiagnostics': [
                2403, // 2403 -> Subsequent variable declarations
                2300, // 2300 -> Duplicate identifier
                2374, // 2374 -> Duplicate number index signature
                2375  // 2375 -> Duplicate string index signature
            ]
            } 
        }
    ]
    },
    plugins: [

    new CopyWebpackPlugin([ { from: 'src/assets', to: 'assets' } ]), 
    new HtmlWebpackPlugin({ template: 'src/index.html', inject: true }), // generates html
    ]
  
};

function root(args) {
  var path = require('path'); 
    
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}