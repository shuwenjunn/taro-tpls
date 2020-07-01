import Taro from '@tarojs/taro'
import qs from 'qs'
import {
  server,
} from './config';
import {
  hex_sha1
} from './security/sha1'


function get_params(api, params, serverType, signType) {
  let data = {
    api,
    signType,
    ...params
  }
  const access_token = Taro.getStorageSync('access_token')
  if (access_token) {
    data.auth = access_token
  }

  if (serverType == 'sso') {
    data = {
      ...data,
      version: '1',
      proType: 'cs',
      clientType: Taro.getStorageSync('clientType'),
      deviceId: '12345',
      platform: Taro.getStorageSync('platform'),
    }
  }
  if (serverType == 'integral') {
    data = {
      ...data,
      version: '1',
      proType: 'cs',
    }
  }
  data = get_signature(data, serverType)
  return data
}

function get_signature(params, serverType) {
  const request = {
    'flag': server[serverType].flag,
    'timestamp': new Date().getTime(),
    ...params
  }
  request['sign'] = calc_signature(request)
  return request
}

function calc_signature(parms) {
  let sign = ''
  let tmpArr = []
  let tmpStr = ''
  let result = ''
  for (const key in parms) {
    if (parms[key]) {
      tmpArr.push(key)
    }
  }
  tmpArr = tmpArr.sort().reverse()
  for (let i = 0; i < tmpArr.length; i++) {
    if (typeof (parms[tmpArr[i]]) === 'object') {
      tmpStr = tmpStr + tmpArr[i].toLowerCase() + JSON.stringify(parms[tmpArr[i]])
    } else {
      tmpStr = tmpStr + tmpArr[i].toLowerCase() + parms[tmpArr[i]]
    }
  }
  const sha = hex_sha1(utf16to8(tmpStr))
  const shaLength = sha.length
  let count = parseInt(tmpArr.length * 1.4)
  if (count >= shaLength) {
    count = shaLength
  }
  const step = parseInt(shaLength / count)
  for (let i = 0; i < count; i++) {
    const num = Math.floor(i * step)
    sign = sign + sha.charAt(num)
  }
  result = sign
  return result
}

function utf16to8(str) {
  let out, i, len, c
  out = ''
  len = str.length
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i)
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i)
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    }
  }
  return out
}

function invokeApi(options = {data: {}, server: 'interface'}) {
  const baseUrl = server[options.server].address + server[options.server].entrance
  return Taro.request({
    url: baseUrl,
    data: qs.stringify(get_params(options.api, options.data, options.server, options.signType)),
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  }).then((res) => {
    const {
      statusCode,
      data
    } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (data.status !== 'ok') {
        Taro.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000
        })
        switch (data.code) {
          case '30008' || '80008':
            // todo 续签
            break
        }
      }
      return data
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  })
    .catch(err => {
      console.log('请求失败', err)
    })
}

const Request = (params) => {
  return invokeApi(params)
}

export default Request
