import Taro from '@tarojs/taro'
import config from '@/config/'

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

class Request {
    isRefreshToken: boolean
    requestQueue: []

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

    private refreshToken() {
        // 伪代码
        return this.request({ tag: '123456' }, 'GET')
    }

    private checkHttpStatus(params: any, res: any, resolve: any, reject: any) {
        // token过期 需要刷新token

        switch res.status
            case '9999':

        if (res.status === '9999') {
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
                this.requestQueue.push(() => {
                    this.request(params)
                })
            }
        }
    }

    private request(params: any) {
        return new Promise((resolve, reject) => {
            Taro.request({
                ...params,
                method: params.method || 'GET',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
            })
        })
            .then(res => {
                this.checkHttpStatus(res, params, resolve, reject)
            })
    }


}