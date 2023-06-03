const path = require("path")
const webpack = require("webpack")
const IS_PRODUCTION = process.env.NODE_ENV == "production"; // 正式环境

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  //部署应用包时的基本 URL
  devServer: {
    port: 8000
  },
  publicPath: "/web",
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({ // webpack自带该插件，无需单独安装
        'process.env': {
          NODE_ENV: process.env.NODE_ENV // 将属性转化为全局变量，让代码中可以正常访问
        }
      })
    ]
  },
  chainWebpack: config => {
    if (IS_PRODUCTION) {
      config.externals({
        "echarts": "echarts"
      })
    }
  }
}
