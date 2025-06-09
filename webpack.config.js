const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
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
const config = {
    // mode: isDev ? 'development':'production',
    // mode:'production',
    mode: 'development', //production 默认开启tree shaking
    target: 'web',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
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
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'], // 支持 .ts, .tsx 和 .js 文件
    },
    devtool: isDev ? 'source-map' : 'eval-source-map', // 根据环境选择 source-map
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/, // 匹配 JavaScript 和 TypeScript 文件
                exclude: /node_modules/, // 排除 node_modules 目录
                use: {
                    loader: 'swc-loader',
                    options: {
                        jsc: {
                            parser: {
                                syntax: 'typescript', // 如果使用 JavaScript，就用 'ecmascript'
                                jsx: true, // 启用 JSX 解析
                            },
                            transform: {
                                react: {
                                    runtime: 'automatic', // 使用 React 17+ 的 JSX 转换
                                },
                            },
                            minify: {
                                compress: true,  // 启用代码压缩
                                mangle: true,    // 启用变量名混淆
                                output: {
                                    comments: false,  // 删除注释
                                },
                            },
                        },
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
        ]
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
        minimize: true,  // 确保压缩代码
        minimizer: [
            new CssMinimizerPlugin(), // 启用 CSS 压缩插件
        ],
        sideEffects: false //tree shaking
    },


}
module.exports = config