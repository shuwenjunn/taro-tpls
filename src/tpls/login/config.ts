import request from "@/api/request"
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
          return request({
            api: 'username.login',
            data: {username, password},
            server: 'integral'
          })
        },
        model: 'token'
      },
      phoneCodeLogin: {
        service: function (phone, code) {
          return request({
            api: 'phone.login',
            data: {phone, code},
            server: 'integral'
          })
        },
        model: 'token'
      }
    },
  },
  commonApi: {
    getPhoneCode: function (phone) {
      return request({
        api: 'phone.login',
        data: {phone}
      })
    },
  }
}

