const path = require("path");
const HTMLPlugin = require("html-webpack-plugin"); //引入插件
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");

const isDev = process.env.NODE_DEV === "development";

const config = {
  target: "web", //编译目标是web平台
  entry: path.join(__dirname, "src/index.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        //以.vue结尾的文件，采用vue-loader
        test: /.vue$/,
        loader: "vue-loader",
      },
      {
        test: /.jsx$/,
        loader: "babel-loader",
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.styl/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          "stylus-loader",
        ],
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "[name]-aaa.[ext]",
              output: "/i",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_DEV: isDev ? '"development"' : '"production"',
      },
    }),
    new HTMLPlugin(),
    new VueLoaderPlugin(),
  ],
};

// 开发环境配置
if (isDev) {
  config.devtool = "#cheap-module-eval-source-map";
  config.devServer = {
    port: 8000,
    host: "0.0.0.0",
    overlay: {
      // 当webpack编译出现错误时，显示到网页
      errors: true,
    },
    hot: true, //开启热加载，修改代码时不刷新整个页面
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
}
module.exports = config;
