const path = require("path");
const globImporter = require("node-sass-glob-importer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const filename = (ext) => (isDev ? `[name]${ext}` : `[name].[contenthash]${ext}`);

module.exports = {
  devtool: isDev ? "inline-source-map" : "eval",
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: "./js/main.js",
  },
  output: {
    filename: `./js/${filename(".js")}`,
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    open: true,
    compress: true,
    hot: true,
    port: 3000,
    client: {
      logging: "none",
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /node_modules/,
          chunks: "all",
          enforce: true,
        },
      },
    },
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `./css/${filename(".css")}`,
    }),
    new HtmlWebpackPlugin({
      template: "./template/pages/about.pug",
      filename: "about.html",
    }),
    new HtmlWebpackPlugin({
      template: "./template/pages/career.pug",
      filename: "career.html",
    }),
    new HtmlWebpackPlugin({
      template: "./template/pages/portfolio.pug",
      filename: "portfolio.html",
    }),
    new HtmlWebpackPlugin({
      template: "./template/pages/index.pug",
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "pug-html-loader",
            options: {
              pretty: isDev,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, { loader: "css-loader" }],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  ["postcss-preset-env"],
                  [
                    "postcss-plugin-px2rem",
                    {
                      rootValue: 16,
                      unitPrecision: 4,
                      propWhiteList: [],
                      propBlackList: ["border"],
                      exclude: false,
                      selectorBlackList: [],
                      ignoreIdentifier: false,
                      replace: true,
                      mediaQuery: false,
                      minPixelValue: 0,
                    },
                  ],
                ],
              },
            },
          },
          "group-css-media-queries-loader",
          {
            loader: "sass-loader",
            options: {
              warnRuleAsWarning: true,
              sassOptions: {
                importer: globImporter(),
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        type: "asset/resource",
        generator: {
          filename: "[path][name][ext]",
        },
      },
      {
        test: /\.(json|xml)$/,
        type: "asset/resource",
        generator: {
          filename: `[path]${filename("[ext]")}`,
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        type: "asset/resource",
        generator: {
          filename: `[path]${filename("[ext]")}`,
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
