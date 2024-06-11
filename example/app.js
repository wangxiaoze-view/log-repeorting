/**
 * @description 模拟日志上报接口
 * @type {e | (() => Express)}
 */
const express = require('express');
const bodyParser = require('body-parser');
const rawBodyParser = require('raw-body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(rawBodyParser());

let data = null;
// 模拟上报错误日子
app.post('/postLog', (req, res) => {
  // 使用于navigator.sendBeacon上传
  const bodyString = req.rawBody.toString('utf8');
  // console.log(JSON.parse(bodyString))
  data = JSON.parse(bodyString);
  res.send('success');
});

// 获取日志
app.get('/getLogData', (req, res) => {
  res.send({
    data: data || null,
  });
});

app.listen(8888);
console.log('服务启动成功: 8888端口');
