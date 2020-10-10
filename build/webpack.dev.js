/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangyan
 * @Date: 2020-09-28 23:33:15
 * @LastEditors: zhangyan
 * @LastEditTime: 2020-09-28 23:39:31
 */
const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  mode: 'development'
}