const
  axios = require('axios'),
  crypto = require('crypto'),
  qs = require('querystring'),
  {rsa, aes} = require('./encrypt')

const login = (mail, pass) => {
  const
    data = JSON.stringify({
      username: mail,
      password: crypto.createHash('md5').update(pass).digest('hex'),
      rememberLogin: true,
      csrf_token: ''
    }),
    salt = '2VRpcLApaHXPa8Rj'


  return axios.request({
    url: 'https://music.163.com/weapi/login',
    method: 'post',
    data: qs.stringify({
      params: aes(aes(data, '0CoJUm6Qyw8W8jud'), salt),
      encSecKey: rsa(Buffer.from('jR8aPXHapALcpRV2'.padStart(128, '\0')))
    }),
    headers: {
      referer : 'https://music.163.com/',
      cookie: 'os=pc'
    }
  })
}

module.exports = {
  login
}
