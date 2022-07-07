# 前端工具链

## 1. webpack 中 loader 和 plugin 的区别

1. loader：本身只能打包 commonjs 规范的 js 文件，所以针对 css，图片等格式的文件没法打包，需要 loader 来加载各种类型的文件。
2. plugin：webpack 在编译过程中会触发一系列的钩子函数，插件做的就是在钩子上注册自定义的任务，在编译期间就会触发注册的任务。

## 2. webpack 常用 loader

1. css-loader：让 webpack 能够识别读取 .css 文件，解析 css 文件得到一个数组存放处理后的样式字符串
2. style-loader：将解析后的 css 以标签 style 的形式插入到 HTML 中，需要先经过 css-loader 解析
3. babel-loader：通过 babel 来解析 .js 文件，会转换去除箭头函数等 es6 语法
4. url-loader：将图片转换成一个 DataURL，然后打包到 JavaScript 代码中。

## 3. webpack 常用插件

1. eslint-webpack-plugin：用于解析 eslint 的插件
2. html-webpack-plugin：将打包得到的 js 等资源，如 entry 指定的输出文件，以 script 标签插入到指定的 html 中
3. webpack-dev-server：开发服务器，监听代码文件自动在内存中打包，实时更新页面，不会保存到 dist，运行命令 `npx webpack serve` 启动

## 4. webpack 常用配置项

1. entry：入口 js 文件。
2. output：
   1. path：输出路径
   2. filename：输出文件名
   3. clean：true 表示自动将上次打包目录资源清空
3. mode：表示是开发环境还是生产环境。
4. module：配置 loader
   1. test：正则，匹配文件，如`/\.css$/` 匹配 css 结尾的文件
   2. use：匹配的文件用什么 loader 处理
5. plugin：插件数组
6. devServer：webpack-dev-server 插件的配置，监听代码文件自动在内存中打包，实时更新页面，不会保存到 dist
   1. `host: 'localhost'` 启动服务器域名
   2. `port: '3000'` 启动服务器端口号
   3. `open: true` 是否自动打开浏览器
