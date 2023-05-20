const path = require("path")
const webpack = require("webpack")

function resolve(dir) {
  return path.join(__dirname, dir)
}

const timestamp = new Date().getTime() // 打包时加时间戳


module.exports = {
  //部署应用包时的基本 URL
  devServer: {
    port: 8000
  },
  publicPath: "/",
  outputDir: process.env.outputDir,
  lintOnSave: process.env.NODE_ENV !== "production",
  css: {
    extract: {
      Type: true,
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({ // webpack自带该插件，无需单独安装
        'process.env': {
          NODE_ENV: process.env.NODE_ENV // 将属性转化为全局变量，让代码中可以正常访问
        }
      })
    ]
  },

}
