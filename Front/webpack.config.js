const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entryPoint = path.join(__dirname, "src", "index.js")

module.exports = {
    entry: entryPoint,
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: [".jsx", ".js", ".ts", ".tsx", ".css"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
            filename: "./index.html"
        })
    ],
    devServer: {
        historyApiFallback: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            
            {
                test: /\.(css)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true,
                        }
                    }
                ],
                include: /\.module\.css$/,
            },
            {
                test: /\.(css)$/,
                use: ["style-loader", "css-loader"],
                exclude: /\.module\.css$/,
            },
        ]
    }
};