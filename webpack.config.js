
var CopyWebpackPlugin  = require('copy-webpack-plugin');
var HtmlWebpackPlugin  = require('html-webpack-plugin');

/*
 * Config
 */
module.exports = {
    // for faster builds use 'eval'
    debug: true,
    watch: true,
    
    // webpack-dev-server config
    // in the webpack-dev-server all files are ran from memory and not copied anywhere (no dist/ folder created)
    devServer: {
        port: 8001,
        contentBase: "./dist"
    },
  
    
    entry: { 'lib': './src/lib.ts', 'main': './src/main.ts' }, // angular2.0 app
    
    // Config for our build files
    output: {
        path: root('dist'), // our build folder name
        filename: '[name].bundle.js', // [name] is used so the bundle file name matches the entry point defined above
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },
    
    devtool: 'source-map',

    resolve: { extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'] },// Add `.ts` and `.tsx` as a resolvable extension. 
    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint-loader',
                exclude: [/node_modules/]
            }
        ],
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { 
                test: /\.tsx?$/, // regex which selects which type of files should be ran through this loader ( .ts or .tsx )
                loader: 'ts-loader', // loader name
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