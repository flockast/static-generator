const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const config = require("./config.json");

module.exports = (env, options) => {

    const isDev = options.mode === "development";

    let HtmlWebpackPlugins = [];

    config.route.forEach(route => {
        for (key in route) {
            let filename = `${key}/index.html`.split("/").filter(el => el !== "").join("/");
            let template = `./src/pages/${route[key]}.ejs`;
            HtmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    filename: filename,
                    template: template
                })
            )
        }
    });

    return {
        entry: [
            './src/assets/js/main.js',
            './src/assets/styles/main.styl'
        ],
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'assets/js/bundle.[name].js'
        },
        devServer: {
            overlay: true
        },
        devtool: isDev ? 'source-map' : '',
        module: {
            rules: [
                {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
                {
                    test: /\.styl$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "stylus-loader"
                    ]
                }
            ]
        },
        plugins: [
            !isDev ? new OptimizeCSSAssetsPlugin({}) : () => {
            },
            new MiniCssExtractPlugin({
                filename: 'assets/css/bundle.[name].css'
            })
        ].concat(HtmlWebpackPlugins)
    }
};