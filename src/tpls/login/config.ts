import API from "@/api/request"
import LoginConfig from './types/login'

interface CommonApiConfig {
    getPhoneCode(phone: string): Promise<any>
}

type Iconfig = {
    login: LoginConfig
    commonApi: CommonApiConfig
}

// eslint-disable-next-line import/prefer-default-export
export const config: Iconfig = {
    login: {
        loginType: 'username',// 默认的登陆方式
        multipl: false,
        // 组件提供的api参数范围一定是大于 未来可变的参数
        api: {
            userNameLogin: {
                service: function (username, password) {
                    // 自定义协议写这里
                    return API.request({
                        api: 'username.login',
                        data: { username, password }
                    })
                },
                model: 'token'
            },
            phoneCodeLogin: {
                service: function (phone, code) {
                    return API.request({
                        api: 'phone.login',
                        data: { phone, code }
                    })
                },
                model: 'token'
            }
        },
    },
    commonApi: {
        getPhoneCode: function (phone) {
            return API.request({
                api: 'phone.login',
                data: { phone }
            })
        },
    }
}

