<div align="center">
<img width="200" src="https://qiniu.wangxiaoze.wang/hexo-blog/wechat_au.jpeg" alt="wxz"/>

<p style="text-align: center;">

  <a href="https://www.npmjs.com/package/dayjs">
    <img src="https://img.shields.io/badge/dayjs-1.11.10-brightgreen.svg" alt="vue">
  </a>
 <a href="https://www.npmjs.com/package/tslib/">
    <img src="https://img.shields.io/badge/tslib-2.6.2-brightgreen.svg" alt="vue">
  </a>
</p>
<h1>@log-reporting/core （日志上报）</h1>
</div>


**文档还在完善中....**


## 🔈 注意事项

> 本系统的开发目的很简单，就是为了在部分情况下搜集前端的异常日志，用于分析异常情况; 
> 如：线上环境的项目我们会吧一些日志删除，如果前端报错那么日志是首选， 这样的情况我们不知道是哪里的报错导致页面崩溃的；
> 那么开发这款工具常规情况下能解决大部分的问题；

该版本为全新版本, 与之前的版本会有很大的区别;


## 🔈 日志搜集范围

1. 资源：资源地址不正确或不存在导致的资源异常
2. 代码：搜集报错信息，页面的崩溃等等；
3. 请求：截请求参数错误，访问地址不存在，异常拦
4. 额外添加功能：支持录制自定义时间的视频，但是最大时间不能超过1分钟;
5. 支持性能监控, 白屏时间, 页面加载时间等等;
6. 支持`pv`页面浏览, 需要手动提交;
7. 支持`曝光`, 需要手动设置对应的元素(仅支持在可是区域内);


## 🔈 如何使用
需要克隆下载该项目, 执行命令`pnpm run build`， 之后会在根目录`dist`文件下看到打包的对应的文件信息; 根据不同平台引入即可;

下面代码示例为浏览器的使用：
``` js
<script src="dist/index.umd.js"></script>

<script>
    logReportingCore.init({
        // 上报地址
      dsn: 'http://localhost:8888/postLog',
      // 是否开启调试
      isDebug: true,
      // 是否捕获错误
      isError: true,
      // 是否捕获console.error
      isConsoleError: true,
      // 是否捕获性能
      isPerformance: true,
      // 是否捕获资源
      isResource: true,
      // 是否捕获请求
      isXhr: true,
      // 屏幕录制
      record: {
        open: true,
        time: 10 * 1000
      },
      // 加密方式
      encryptMethod: 'base64',
      // 上报方式
      method: 'beacon',
      // pv统计
      isPv: true,
      // 曝光统计
      isExposure: true
    })
</script>
```

在`vue`中使用,
`npm install @log-reporting/core` 安装依赖

在`main.js`中引入
```js
import {init} from '@log-reporting/core'
init({})
```


根据自己的业务需要开启对应的配置信息;




