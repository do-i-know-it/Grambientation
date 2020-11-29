const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootPath = path.join(__dirname, "./");
const inputPath = path.join(rootPath, "assets");
const outputPath = path.join(rootPath, "build");

module.exports =
{
    mode: "development",
    entry: path.join(inputPath, "scripts", "index.tsx"),
    output:
    {
        path: path.join(outputPath, "scripts"),
        filename: "index.js",
    },
    module:
    {
        rules:
        [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
            }
        ]
    },
    resolve:
    {
        extensions:
        [
          ".ts",
          ".tsx",
          ".js",
          ".jsx",
        ],
    },
    plugins:
    [
        new HtmlWebpackPlugin
        (
            {
                filename: "index.html",
                template: path.join(inputPath, "scripts", "index.html"),
            }
        )
    ],
    devtool: "inline-source-map",
    devServer:
    { 
        contentBase: path.join(outputPath, "scripts"),
        port: 8080,
        inline: true,
        hot: true,
        watchContentBase: true,
    },
};
