import Taro from '@tarojs/taro'
import axios from 'axios'


// 是否正在刷新的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests = []

interface Token{
    token: string
}

interface AxiosInstance{
    [key: string]: any
}

// 从localStorage中获取token
function getLocalToken(): Token {
    const token = Taro.getStorageSync('token')
    return token
}

// 创建一个axios实例
const instance: AxiosInstance = axios.create({
    baseURL: '/api',
    timeout: 300000,
    headers: {
        'Content-Type': 'application/json',
        'X-Token': getLocalToken() // headers塞token
    }
})

// 给实例添加一个setToken方法，用于登录后将最新token动态添加到header，同时将token保存在localStorage中
instance.setToken = (token: Token) => {
    instance.defaults.headers['X-Token'] = token
    Taro.setStorageSync('token', token)
}

function refreshToken() {
    // instance是当前request.js中已创建的axios实例
    return instance.post('/refreshtoken').then(res => res.data)
}


instance.interceptors.response.use(response => {
    const { code } = response.data
    if (code === 1234) {
        const config = response.config
        if (!isRefreshing) {
            isRefreshing = true
            return refreshToken().then(res => {
                const { token } = res.data
                instance.setToken(token)
                config.headers['X-Token'] = token
                config.baseURL = ''
                // 已经刷新了token，将所有队列中的请求进行重试
                requests.forEach(cb => cb(token))
                requests = []
                return instance(config)
            }).catch(res => {
                console.error('refreshtoken error =>', res)
                window.location.href = '/'
            }).finally(() => {
                isRefreshing = false
            })
        } else {
            // 正在刷新token，将返回一个未执行resolve的promise
            return new Promise((resolve) => {
                // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
                requests.push((token) => {
                    config.baseURL = ''
                    config.headers['X-Token'] = token
                    resolve(instance(config))
                })
            })
        }
    }
    return response
}, error => {
    return Promise.reject(error)
})

export default instance
