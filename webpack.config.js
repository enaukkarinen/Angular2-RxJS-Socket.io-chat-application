
var ENV = process.env.ENV = process.env.NODE_ENV = 'development';
var metadata = {
  title: 'Angular2 Webpack Starter by @gdi2990 from @AngularClass',
  baseUrl: '/',
  host: 'localhost',
  port: 3000,
  ENV: ENV
};


/*
 * Config
 */
module.exports = {
  // static data for index.html
  metadata: metadata,
  // for faster builds use 'eval'
  devtool: 'source-map',
  debug: true,

  // our angular app
  entry: { 'vendor': './src/vendor.ts', 'main': './src/main.ts' },

  // Config for our build files
  output: {
    path: root('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },


  resolve: {
        // ensure loader extensions match
    extensions: ['','.ts','.js','.json','.css','.html']
  },
  
  module: {
    loaders: [
      { 
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
  }
  
};

function root(args) {
  var path = require('path'); 
    
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}