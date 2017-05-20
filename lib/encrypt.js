const
    crypto = require('crypto'),
    qs = require('querystring'),
    Big = require('big.js')

const powMod = (i, e, m) => {
    let d = new Big(1)
    i = i.mod(m)
    for (; e > 0; e >>= 1) {
        if (e & 1) d = d.mul(i).mod(m)
        i = i.pow(2).mod(m)
    }
    return d
}

Big.prototype.toHex = function() {
    let
        v = new Big(this),
        r = []
    while (v.gte(16)) {
        r.push(v.mod(16).toString())
        v = v.div(16).round(0, 0)
    }
    r.push(v.toString())
    while (r.length < 256) r.push(0)
    return r.map(e => {
        e == 10 ? e = 'a' : null
        e == 11 ? e = 'b' : null
        e == 12 ? e = 'c' : null
        e == 13 ? e = 'd' : null
        e == 14 ? e = 'e' : null
        e == 15 ? e = 'f' : null
        return e
    }).reverse().join('')
}

const rsa = data => {
    const
        radix = 16,
        buf = [],
        size = new Big(Math.pow(radix, 4))
    let n = new Big(0)
    data = data.toString().split('')
    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].charCodeAt(0)
    }
    console.log(`data: ${data}`)
    for (let i = 0; i <= data.length;) {
        buf.push((data[i++] << 0) + (data[i++] << 8))
    }
    console.log(`buf: ${buf}`)
    for (let e, i = 0; i < buf.length; i++) {
        e = new Big(buf[i])
        e = e.mul(size.pow(i))
        n = n.plus(e)
    }
    console.log(`n: ${n.c.join('')}`)
    n = n.toString()

    data = powMod(new Big(n), 65537, new Big('157794750267131502212476817800345498121872783333389747424011531025366277535262539913701806290766479189477533597854989606803194253978660329941980786072432806427833685472618792592200595694346872951301770580765135349259590167490536138082469680638514416594216629258349130257685001248172188325316586707301643237607')).toHex()
    return data
}

const encrypt = data => {
    const
        x = '010001',
        y = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7',
        z = '0CoJUm6Qyw8W8jud'

    data = JSON.stringify(data)

    const randomString = len => {
        return '2VRpcLApaHXPa8Rj'
        const
            alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let
            a, b, c = ''
        for (a = 0; a < len; a += 1) {
            b = Math.random() * alphabets.length,
            b = Math.floor(b),
            c += alphabets.charAt(b);
        }
        return c
    }

    const aes = (v, k) => {
        const cipher = crypto.createCipheriv(
            'aes-128-cbc', k, '0102030405060708')

        return `${cipher.update(v, 'utf8', 'base64')}${cipher.final('base64')}`
    }

    const split = s => {
        const arr = []
        for (let i = 0; i < s.length; i += 2) {
            arr.push(parseInt(s.substr(i, 2), 16))
        }
        return arr
    }

    const str = randomString(16)
    return {
        params: aes(aes(data, z), str),
        encSecKey: rsa(str)
    }
}

module.exports = encrypt
