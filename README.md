### 安装
---
``` bash
npm i -g JetLua/netease-cloud-music
```



### 使用
---

``` js
const music = require('music')

music.login('帐号', '密码').then(results => {
    console.log(results)
})

/*
* 以下接口
* 无需登录
* 即可请求
*/


/*
* 获取听歌排行
* uid:
*    用户 id
*    打开云音乐的个人主页
*    链接里会有
* period:
*    0: 一周
*    1: 所有
*/

music.getRecord('1760687').then(results => {
    console.log(results)
})

music.getRecord('1760687', 1).then(results => {
    console.log(results)
})

/*
* 通过歌曲 id 获取 mp3 链接
* id: 歌曲 id
*/

music.getUri('326997').then(results => {
    console.log(results)
})
```
