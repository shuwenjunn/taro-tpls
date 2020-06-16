import Taro from '@tarojs/taro'
import { BASE_URL } from './config'

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

    private getToken() {
        return Taro.getStorageSync('token')
    }

    private setToken(token: Token) {
        Taro.setStorageSync('token', token)
    }

    private getSignature(params: any): string {
        // goto
        let sign = ''
        for (const val of params) {
            sign += val
        }
        return sign
    }

    private refreshToken() {
        // todo
        return this.request({ tag: '123456' })
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

    private request(params: any) {
        return new Promise(() => {
            Taro.request({
                data: params,
                method: params.method || 'GET',
                url: BASE_URL,
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
            })
        })
            .then(response => {
                const { statusCode, data } = (response as any)
                if (statusCode >= 200 && statusCode <= 300) {
                    this.checkHttpStatus(data, params)
                }

            })
            .catch(err => {
                console.log(`err is ${err}`)
            })
    }

    // upload file 上传文件
}

export default new Request()