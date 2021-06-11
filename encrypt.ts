import * as crypto from 'crypto'

export function aes(raw: string, key: string) {
  const cipher = crypto.createCipheriv('aes-128-cbc', key, '0102030405060708')
  return cipher.update(raw, 'utf8', 'base64') + cipher.final('base64')
}

export function rsa(raw: NodeJS.ArrayBufferView) {
  const key = [
    '-----BEGIN RSA PUBLIC KEY-----',
    'MIGJAoGBAOC1CfYlnfhkLbw1ZikBR33yJnfsFStf9orOYVu3tyUVKzqxeodq6opa',
    'p20uQXYp7E7jQfVhNfzPaVKAEE4DEuy9qSVXyThwEUr2ydBcT38MNoW3pGvuJVky',
    'V1zOELQk2BPP5IddPoIEe5fd71J0HVRrjiidxpNbPs4EYtsKIrjnAgMBAAE=',
    '-----END RSA PUBLIC KEY-----'
  ].join('\n')

  return crypto.publicDecrypt({
    key,
    padding: crypto.constants.RSA_NO_PADDING
  }, raw).toString('hex')
}
