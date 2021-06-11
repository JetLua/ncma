#! /usr/bin/env ts-node

import axios from 'axios'
import crypto from 'crypto'
import qs from 'querystring'

import {aes, rsa} from './encrypt'

export default function(account: string, password: string) {
  const salt = '2VRpcLApaHXPa8Rj'

  const data = JSON.stringify({
    username: account,
    password: crypto.createHash('md5').update(password).digest('hex'),
    rememberLogin: true,
    csrf_token: ''
  })

  return axios.post(
    'https://music.163.com/weapi/login',
    qs.stringify({
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
