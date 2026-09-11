const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const { InjectManifest } = require('workbox-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'
const envFile = isDevelopment ? '.env.development' : '.env.production'
require('dotenv').config({ path: envFile })
require('dotenv').config({ path: '.env' })
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
        }),
        require('autoprefixer')
      ]
    }
  }
}

const appVersion = require('./package.json').version
const buildTime = new Date().toISOString().slice(0, 19).replace('T', ' ')

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  target: 'web',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isDevelopment ? '[name].js' : '[name].[contenthash:8].js',
    chunkFilename: isDevelopment ? '[name].chunk.js' : '[name].[contenthash:8].chunk.js',
    assetModuleFilename: 'assets/[name].[hash:8][ext]',
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
      overlay: { errors: true, warnings: false },
      logging: 'warn'
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
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM'
  // },
  devtool: isDevelopment ? 'eval-cheap-module-source-map' : 'source-map',
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
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
            },
            env: {
              targets: 'defaults, not ie 11'
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
            options: {
              modules: {
                localIdentName: isDevelopment
                  ? '[name]__[local]__[hash:base64:5]'
                  : '[hash:base64:8]'
              },
              sourceMap: isDevelopment
            }
          },
          postcssLoader,
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: [
          styleLoader,
          {
            loader: 'css-loader',
            options: { sourceMap: isDevelopment }
          },
          postcssLoader,
          {
            loader: 'sass-loader',
            options: { sourceMap: isDevelopment }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
        }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:8][ext]'
        }
      },
      {
        test: /\.(mp3|wav|ogg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'media/[name].[hash:8][ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: isDevelopment
        ? false
        : {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            minifyJS: true,
            minifyCSS: true
          },
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[contenthash:8].css',
      chunkFilename: isDevelopment ? '[name].chunk.css' : '[name].[contenthash:8].chunk.css'
    }),
    new webpack.DefinePlugin({
      __APP_VERSION__: JSON.stringify(appVersion),
      __BUILD_TIME__: JSON.stringify(buildTime),
      __DEV__: JSON.stringify(isDevelopment)
    }),
    new Dotenv({
      path: isDevelopment ? '.env.development' : '.env.production',
      defaults: true,
      safe: true
    }),
    new CompressionPlugin({
      test: /\.(js|css|html|svg)$/i,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
      algorithm: 'gzip',
      filename: '[path][base].gz'
    }),
    new CompressionPlugin({
      test: /\.(js|css|html|svg)$/i,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
      algorithm: 'brotliCompress',
      filename: '[path][base].br'
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true
        }
      }
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          to: '.',
          globOptions: {
            ignore: ['**/.gitkeep', '**/.DS_Store']
          },
          noErrorOnMissing: true
        }
      ]
    }),
    ...(!isDevelopment
      ? [
          new InjectManifest({
            swSrc: './src/service-worker.ts',
            swDest: 'service-worker.js',
            maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
          })
        ]
      : []),
    ...(shouldAnalyze
      ? [new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false })]
      : [])
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 25,
      maxAsyncRequests: 25,
      minSize: 20000,
      cacheGroups: {
        framework: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
          name: 'framework',
          priority: 40,
          enforce: true,
          reuseExistingChunk: true
        },
        lodash: {
          test: /[\\/]node_modules[\\/]lodash[\\/]/,
          name: 'lodash',
          priority: 30,
          enforce: true,
          reuseExistingChunk: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10,
          reuseExistingChunk: true
        },
        common: {
          test: /[\\/]src[\\/](utils|common|shared|hooks|services)[\\/]/,
          name: 'common',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimize: !isDevelopment,
    minimizer: [
      '...',
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }
            }
          ]
        }
      })
    ],
    moduleIds: 'deterministic',
    chunkIds: 'deterministic'
  },
  performance: {
    hints: isDevelopment ? false : 'warning',
    maxAssetSize: 250 * 1024,
    maxEntrypointSize: 400 * 1024
  },
  stats: isDevelopment ? 'minimal' : 'normal',
  infrastructureLogging: {
    level: 'info',
    debug: false
  }
}
