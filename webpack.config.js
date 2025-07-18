const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const node_env = process.env.NODE_ENV
const isDev = node_env === 'development'
console.log('node_env', node_env)
const postcssConfig = {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: [
        require('postcss-px-to-viewport')({
          unitToConvert: "rpx",       // 要转换的单位，默认是 'px'
          viewportWidth: 750,         // 设计稿宽度
          viewportUnit: 'vw',         // 转换后的单位
          minPixelValue: 1,           // 小于或等于这个值的 px 不转换
          mediaQuery: false           // 是否转换媒体查询中的单位
        })
      ]
    }
  }
}
module.exports = {
  mode: isDev ? 'development' : 'production',
  target: 'web',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  devServer: {
    static: path.join(__dirname, 'dist'), // 服务的静态文件目录
    port: 3000, // 服务运行的端口号
    host: '0.0.0.0', // 监听所有 IP，允许局域网访问
    open: true, // 自动打开浏览器
    hot: true, // 启用热更新
    compress: true, // 启用 gzip 压缩
    setupMiddlewares: (middlewares, devServer) => {
      // 打印 IP 地址和端口
      const address = devServer?.listeningApp?.address();
      const host = address?.address === '::' ? 'localhost' : address?.address;
      const port = address?.port;
      console.log(`Server is running at http://${host}:${port}`);

      return middlewares;
    },
    // 在这里添加代理配置
    proxy: [{
      '/api': {
        target: 'http://localhost:3000', // 代理目标地址
        changeOrigin: true, // 对请求头中的 `Host` 进行修改
        secure: false, // 如果是 https 需要设置为 true
        pathRewrite: {
          '^/api': '', // 将 /api 重写为空（可选）
        },
      },
    }],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devtool: isDev ? 'eval-source-map' : false, 
  // 开发用 source-map，生产关闭
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                jsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
              ...(!isDev ? {} : {
                minify: {
                  compress: {
                    drop_console: !isDev,
                    pure_funcs: ['console.log', 'console.info', 'console.warn', 'console.error', 'console.debug'],
                  },
                  mangle: true,
                },
              })
            }
          },
        },
      },
      {
        test: /\.module\.s?css$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }, // 启用 CSS Modules
          },
        },
          postcssConfig,
          'sass-loader']
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        //   use: ['style-loader', 'css-loader'], // 如果需要支持 CSS 样式
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 指定模板 HTML 文件
      filename: 'index.html', // 输出的 HTML 文件名称
    }),
    new BundleAnalyzerPlugin(),
    //    new MiniCssExtractPlugin({
    //     filename: 'feature-app.css',
    //     chunkFilename: 'feature-app.[id].[contenthash].css',
    //   }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css', // 提取的 CSS 文件名
    }),
    // 启用 Gzip 压缩
    new CompressionPlugin({
      test: /\.(js|css|html)$/i, // 只对 .js, .css, .html 文件进行压缩
      threshold: 1024,  // 文件大于 10KB 时启用压缩
      minRatio: 0.8,     // 压缩比率小于 0.8 时进行压缩
      deleteOriginalAssets: false, // 保留原始文件，不删除
    }),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,         // 模块最小尺寸（可选：调小可以拆得更细）
      minChunks: 2,       // 至少被两个 chunk 引用就提取
      cacheGroups: {
        default: {
          name: 'common-lib',
          priority: -20,
          reuseExistingChunk: true,
        },
        common: {
          test: /[\\/]src[\\/](utils|common|shared)[\\/]/, // 匹配你的公共文件目录
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          priority: -5,
          enforce: true, // 强制拆包，确保生成 common.js
          reuseExistingChunk: true,
        },
        // externals  稍微大点的三方包直接走cdn
        // vendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name: 'vendors',
        //   priority: -10,
        //   chunks: 'all',
        // },
      },
    },
    minimize: true,
    minimizer: [
      //   new TerserPlugin({
      //   terserOptions: {
      //     compress: {
      //       drop_console: !isDev,
      //     },
      //     format: {
      //       comments: !isDev,
      //     },
      //   },
      //   extractComments: !isDev,
      // }),
      new CssMinimizerPlugin(), // 启用 CSS 压缩插件
    ],
    sideEffects: false,//tree shaking
  },
};
