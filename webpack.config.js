const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const isDevelopment = process.env.NODE_ENV !== 'production'
const shouldAnalyze = process.env.ANALYZE === 'true'
const apiProxyTarget = process.env.API_PROXY_TARGET

const styleLoader = isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        require('postcss-px-to-viewport')({
          unitToConvert: 'rpx',
          viewportWidth: 750,
          viewportUnit: 'vw',
          minPixelValue: 1,
          mediaQuery: false
        })
      ]
    }
  }
}

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  target: 'web',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isDevelopment ? '[name].js' : '[name].[contenthash:8].js',
    chunkFilename: isDevelopment ? '[name].chunk.js' : '[name].[contenthash:8].chunk.js',
    clean: true,
    publicPath: '/'
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3000,
    host: '0.0.0.0',
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    client: {
      overlay: { errors: true, warnings: false }
    },
    proxy: apiProxyTarget
      ? [
          {
            context: ['/api'],
            target: apiProxyTarget,
            changeOrigin: true,
            secure: false,
            pathRewrite: { '^/api': '' }
          }
        ]
      : []
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: isDevelopment ? 'eval-cheap-module-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: { syntax: 'typescript', jsx: true },
              transform: { react: { runtime: 'automatic', development: isDevelopment } }
            }
          }
        }
      },
      {
        test: /\.module\.s?css$/,
        use: [
          styleLoader,
          {
            loader: 'css-loader',
            options: { modules: { localIdentName: '[name]__[local]__[hash:base64:5]' } }
          },
          postcssLoader,
          'sass-loader'
        ]
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: [styleLoader, 'css-loader', postcssLoader, 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html', filename: 'index.html' }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].chunk.css'
    }),
    new CompressionPlugin({
      test: /\.(js|css|html)$/i,
      threshold: 1024,
      minRatio: 0.8,
      deleteOriginalAssets: false
    }),
    ...(shouldAnalyze ? [new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false })] : [])
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10
        },
        common: {
          test: /[\\/]src[\\/](utils|common|shared)[\\/]/,
          name: 'common',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimize: !isDevelopment,
    minimizer: ['...', new CssMinimizerPlugin()]
  },
  performance: {
    hints: isDevelopment ? false : 'warning'
  }
}
