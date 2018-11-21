const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const {routing} = require("./config.json");

module.exports = (env, options) => {

    const isDev = options.mode === "development";

    let HtmlWebpackPlugins = [];

    routing.forEach(route => {
        for (page in route) {
            HtmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    filename: `${page}/index.html`.split("/").filter(el => el !== "").join("/"),
                    template: `./src/pages/${route[page]}.ejs`
                })
            )
        }
    });

    return {
        entry: [
            './src/assets/js/index.js',
            './src/assets/styles/index.scss'
        ],
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'static/bundle.[name].js',
            publicPath: "/"
        },
        devServer: {
            overlay: true
        },
        devtool: isDev ? 'source-map' : '',
        module: {
            rules: [
                {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        `css-loader?sourceMap=${ isDev }&url=false`,
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: ['ie >= 8', 'last 4 version']
                                    })
                                ],
                                sourceMap: isDev
                            }
                        },
                        `sass-loader?sourceMap=${ isDev }`
                    ]
                },
                {test: /\.ejs$/, loader: "ejs-loader"},
            ]
        },
        plugins: [
            !isDev ? new OptimizeCSSAssetsPlugin({}) : () => {},
            new CopyWebpackPlugin([
                {
                    from: './src/assets/fonts',
                    to: 'static/fonts',
                },
                {
                    from: './src/assets/img',
                    to: 'static/img',
                }
            ]),
            new MiniCssExtractPlugin({
                filename: 'static/bundle.[name].css'
            }),
        ].concat(HtmlWebpackPlugins)
    }
};