## 安装

```sh
npm i -g JetLua/ncma
```

## 使用

```js
const ncma = require('ncma')

ncma.login('帐号', '密码').then(info => {
  console.log(info)
})
```


## 更新记录

### 2019/04/12
  - `axios` 替代 `request`
  - 基于 `node.js` 的 `RSA` 加密

### 2017/05/20
  - 手工 `RSA`

### 2016/09/29
  - [流程分析](https://www.jianshu.com/p/eb3a4e999192)