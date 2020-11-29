const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootPath = path.join(__dirname, "../../");
const configurationPath = path.join(rootPath, "configuration");
const inputPath = path.join(rootPath, "assets");
const outputPath = path.join(rootPath, "build");

module.exports =
{
    mode: "production",
    entry: path.join(inputPath, "scripts", "index.tsx"),
    output:
    {
        path: path.join(outputPath, "scripts"),
        filename: "index.js"
    },
    module:
    {
        rules:
        [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options:
                {
                    configFile: path.join(configurationPath, "production", "tsconfig.json"),
                },
            },
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
};
