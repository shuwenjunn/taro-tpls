import request from "@/api/request"
import LoginConfig from './types/login'
import RegistConfig from './types/regist'

interface CommonApiConfig {
  getPhoneCode(phone: string): Promise<any>

  getImageCode(): Promise<any>

  logOut(): Promise<any>
}

type Iconfig = {
  tokenKey: string
  login: LoginConfig
  regist: RegistConfig
  commonApi: CommonApiConfig,

}


// eslint-disable-next-line import/prefer-default-export
export const config: Iconfig = {
  tokenKey: 'access_token',
  login: {
    loginType: 'username',// 默认的登陆方式
    multipl: false,
    // 组件提供的api参数范围一定是大于 未来可变的参数
    api: {
      userNameLogin: {
        service: function (username, password) {
          // 自定义协议写这里
          return request({
            api: 'customer.account.login',
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
  regist: {
    api: {
      customerAccountRegister: {
        service(phone: string, code: string, password: string): Promise<any> {
          return request({
            api: 'customer.account.register',
            data: {phone, code, password},
            server: 'integral'
          })
        }
      }
    }
  },
  commonApi: {
    getPhoneCode: function (phone) {
      return request({
        api: 'customer.account.vcode.phone',
        data: {number: phone},
        server: 'integral'
      })
    },
    getImageCode: function () {
      return request({
        api: 'customer.account.vcode.image',
        data: {},
        server: 'integral'
      })
    },
    logOut: function () {
      return request({
        api: 'customer.account.logout',
        data: {},
        server: 'integral'
      })
    },
  }
}

