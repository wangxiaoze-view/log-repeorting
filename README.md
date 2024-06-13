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
<h1>log-reporting （日志上报）</h1>
</div>

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
    logReporting.init({
        // 上报地址
        dsn: 'http://localhost:8888/postLog',
        // 是否开启调试, 控制台会打印出日志信息
        debug: false,
        // 上报方式：fetch sendBeacon
        logMethod: 'fetch', 
        // 配置参数
        config: {
            // 是否开启录制, 可以录制报错前20s的视频
            isRecord: true,
            // 录制的时间(20s), 最大不能超过1分钟
            recordTime: 20 * 1000,
            // 页面准备好，是否就立即监听
            watchReady: true,
            // 监听js
            watchJsError: true,
            // 监听资源报错
            watchSource: true,
            // 监听请求报错
            watchAxios: true,
        }
    })
</script>
```

在`vue`中使用,
`pnpm install log-reporting` 安装依赖

在`main.js`中引入
```js
import {logReporting} from 'log-reporting'
logReporting.init({
    // 上报地址
    dsn: 'http://localhost:8888/postLog',
    // 是否开启调试, 控制台会打印出日志信息
    debug: true,
    // 上报方式：fetch sendBeacon
    logMethod: 'fetch',
    // 配置参数
    config: {
        // 是否开启录制, 可以录制报错前20s的视频
        isRecord: true,
        // 录制的时间(20s), 最大不能超过1分钟
        recordTime: 20 * 1000,
        // 页面准备好，是否就立即监听
        watchReady: true,
        // 监听js
        watchJsError: true,
        // 监听资源报错
        watchSource: true,
        // 监听请求报错
        watchAxios: true,
    }
})
```


根据自己的业务需要开启对应的配置信息;

---

注意：

1. 日志上报的方式有俩种: `fetch` 和 `sendBeacon`; 

2. 如果要开启屏幕录制功能那么就不能使用`sendBeacon`,如果您使用`sendBeacon`去上报, 那么在复杂的项目目前它是上传不了的, 因为会把录制的元素信息也会上传;这里使用了开源[rrweb](https://github.com/rrweb-io/rrweb)

3. 要想使用录制视频上传, 那么请使用`fetch`方式进行上传

4. 视频录制的信息使用[lz-string](https://github.com/pieroxy/lz-string)进行压缩加密, 如果您使用的情况, 请在服务端或者客户端对该数据进行解压解密;压缩可查阅代码`/src/lib/send.ts 13行左右`, 解压代码可查阅`/example/index.html 110-118行左右`

5. 如果您想要体验效果：那么可以在`/example`目录下进行`pnpm install`，之后执行`app.js`，之后在`/example/index.html` 点击按钮模拟报错报错，等上报成功之后可以点击`播放按钮预览录制的视频`
