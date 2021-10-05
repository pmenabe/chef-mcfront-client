const path = require('path')

const isEnvProduction = process.env.PROD == 'true';

console.log('Mode:', isEnvProduction ? 'production' : 'development')

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      master: path.resolve(__dirname, './src'),
    }
  },
  entry: {
    master: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public', 'client'),    
    publicPath: '/client/',
    sourceMapFilename: 'bundle.map'
  },
  devtool: '#source-map',
  module: {
    strictExportPresence: true,
    rules: [
      { 
        test: /\.(css|scss)$/, 
        use: [
          'style-loader',
          { 
            loader: 'css-loader', 
            options: { importLoaders: 1 } 
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/, 
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'],
            plugins: [
              'import-glob',
              '@babel/transform-runtime',
              '@babel/proposal-object-rest-spread', 
              '@babel/proposal-class-properties',
              'syntax-dynamic-import'],
          }
        }]
      },
      { 
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg|obj|mtl)$/, 
        use: [{
          loader: 'file-loader?name=_files/[name].[ext]'
        }]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  mode: isEnvProduction ? 'production' : 'development',
  
  //Debug options
  watch: isEnvProduction ? false : true,
  watchOptions:  {
    aggregateTimeout: 300,
    poll: true,
    poll: 1000
  },
  stats: {
    warnings: false
  }
}