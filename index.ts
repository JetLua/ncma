import axios from 'axios'
import * as crypto from 'crypto'
import {stringify} from 'querystring'

import {aes, rsa} from './encrypt'

export default function a(account: string, password: string) {
  const salt = '2VRpcLApaHXPa8Rj'

  const data = JSON.stringify({
    username: account,
    password: crypto.createHash('md5').update(password).digest('hex'),
    rememberLogin: true,
    csrf_token: ''
  })

  return axios.post(
    'https://music.163.com/weapi/login',
    stringify({
      params: aes(aes(data, '0CoJUm6Qyw8W8jud'), salt),
      encSecKey: rsa(Buffer.from('jR8aPXHapALcpRV2'.padStart(128, '\0')))
    }),
    {
      headers: {
        cookie: 'os=pc',
        referer: 'https://music.163.com/',
      }
    }
  )
}
