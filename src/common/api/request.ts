import Taro from '@tarojs/taro'
import {server} from "@/api/config";
import {hex_sha1} from "@/api/security/sha1";

// 续签失败状态码
const HTTP_ERROR = {
  '400': '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  '401': '用户没有权限（令牌、用户名、密码错误）。',
  '403': '用户得到授权，但是访问是被禁止的。',
  '404': '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  '406': '请求的格式不可得。',
  '410': '请求的资源被永久删除，且不会再得到的。',
  '422': '当创建一个对象时，发生一个验证错误。',
  '500': '服务器发生错误，请检查服务器。',
  '502': '网关错误。',
  '503': '服务不可用，服务器暂时过载或维护。',
  '504': '网关超时。',
}

interface Token {
  token: string
}

interface Server {
  url: string
  path: string
  flag: string
}

class Request {
  isRefreshToken: boolean
  requestQueue: unknown[]
  apiMap: Map<string, Server>

  constructor() {
    this.isRefreshToken = false
    this.requestQueue = []
  }

  public getToken() {
    return Taro.getStorageSync('token')
  }

  public setToken(token: Token) {
    Taro.setStorageSync('token', token)
  }

  private get_params(api, params, serverType, signType) {
    let data = {
      api,
      signType,
      ...params
    }
    const access_token = Taro.getStorageSync('access_token')
    if (access_token) {
      data.auth = access_token
    }

    data = {
      ...data,
    }
    data = this.get_signature(data, serverType)
    return data
  }

  private get_signature(params, serverType) {
    const request = {
      'flag': server[serverType].flag,
      'timestamp': new Date().getTime(),
      ...params
    }
    request['sign'] = this.calc_signature(request)
    return request
  }

  private calc_signature(parms) {
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
    const sha = hex_sha1(this.utf16to8(tmpStr))
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

  private utf16to8(str) {
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

  private refreshToken() {
    // todo
    return this.request({tag: '123456'})
  }

  private checkHttpStatus(params: any, res: any) {
    // token过期 需要刷新token
    switch (res.status) {
      case '9999':
        if (!this.isRefreshToken) {
          this.isRefreshToken = true
          this.refreshToken()
            .then((result: any) => {
              this.setToken(result.token)
              this.requestQueue.forEach(cb => {
                cb()
              })
            })
        } else {
          // 缓存请求
          this.requestQueue.push(() => {
            this.request(params)
          })
        }
        break;
      default:
    }
  }

  private dealResult(res: any): boolean {
    return HTTP_ERROR[res.code] ? true : false
  }

  public request(params: any) {
    return Taro.request({
      data: params,
      method: params.method || 'GET',
      url: BASE_URL,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
    })
      .then(response => {

        console.log('响应结果为：', (response as any).data)
        return (response as any).data
        // const {statusCode, data} = (response as any)
        // if (statusCode >= 200 && statusCode <= 300) {
        //   if (this.dealResult(data)) {
        //     console.log('获取数据成功')
        //     return data.result
        //   } else {
        //     this.checkHttpStatus(data, params)
        //   }
        // }

      })
      .catch(err => {
        console.log(`err is ${err}`)
      })
  }

  // upload file 上传文件
}

export default new Request()
