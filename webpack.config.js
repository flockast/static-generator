const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {routing} = require("./config.json");

module.exports = (env, options) => {

    const isDev = options.mode === "development";

    let HtmlWebpackPlugins = [];

    routing.forEach(route => {
        for (key in route) {
            HtmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    filename: `${key}/index.html`.split("/").filter(el => el !== "").join("/"),
                    template: `./src/pages/${route[key]}.ejs`
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
                {test: /\.styl$/, use: [MiniCssExtractPlugin.loader, "css-loader?url=false", "stylus-loader"]}
            ]
        },
        plugins: [
            !isDev ? new OptimizeCSSAssetsPlugin({}) : () => {},
            new CopyWebpackPlugin([
                {
                    from: './src/assets/fonts',
                    to: 'static/fonts/[name].[ext]',
                },
                {
                    from: './src/assets/img',
                    to: 'static/img/[name].[ext]',
                }
            ]),
            new MiniCssExtractPlugin({
                filename: 'static/bundle.[name].css'
            }),
        ].concat(HtmlWebpackPlugins)
    }
};