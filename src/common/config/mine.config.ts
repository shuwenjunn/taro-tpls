import {Iconfig, setting} from '@/tpls/mine'
import request from "@/api/request"
import mainStyles from '../../app.less'
const mineConfig: Iconfig = {
  mine: {
    avatarKey: 'avata',
    usernameKey: 'username',
    blocks: [{
      subTitle: '我的订单',
      maxCountInline: 4,
      items: [
        {
          iconPath: require(`./assets/images/order-${mainStyles.theme}.png`),
          desc: '待付款',
          targetPath: '/pages/addressList/index',
          params: {
            aaa: '1234'
          }
        },
        {
          iconPath: require(`./assets/images/order-${mainStyles.theme}.png`),
          desc: '待发货',
          targetPath: 'https://www.baidu.com/',
          params: {
            aaa: '1234'
          }
        },
        {
          iconPath: require(`./assets/images/order-${mainStyles.theme}.png`),
          desc: '待收货',
          targetPath: 'https://i.loli.net/2020/06/24/uKgMtAUQrB1iIZR.png',
          params: {
            aaa: '1234'
          }
        },
        {
          iconPath: require(`./assets/images/order-${mainStyles.theme}.png`),
          desc: '已完成',
          targetPath: 'https://i.loli.net/2020/06/24/uKgMtAUQrB1iIZR.png',
          params: {
            aaa: '1234'
          }
        },
      ]
    }],
    list: [
      [
        {
          iconPath: require(`./assets/images/icon-${mainStyles.theme}.png`),
          desc: '修改密码',
          targetPath: '/tpls/login/pages/setPassword/index',
        },
        {
          iconPath: require(`./assets/images/icon-${mainStyles.theme}.png`),
          desc: '联系客服',
          targetPath: '',
        },
        {
          iconPath: require(`./assets/images/icon-${mainStyles.theme}.png`),
          desc: '地址管理',
          targetPath: '/tpls/address/pages/addressList/index',
        },
        {
          iconPath: require(`./assets/images/icon-${mainStyles.theme}.png`),
          desc: '常见问题',
          targetPath: '/tpls/mine/pages/about/index',
        },
        {
          iconPath: require(`./assets/images/icon-${mainStyles.theme}.png`),
          desc: '关于我们',
          targetPath: 'https://taro-ui.jd.com/#/docs/quickstart',
        },
      ],
    ],
    api: {
      getUserInfo: {
        service: function () {
          return request({
            api: 'phone.login',
            data: {}
          })
        },
        model: 'userinfo'
      },
      exitLogin: {
        service: function () {
          return request({
            api: 'phone.login',
            data: {}
          })
        },
      },
    }
  },
  about: {
    appName: 'APP名称',
    version: 'v.1.0.1',
    logo: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
    list: [
      {
        desc: '使用帮助',
        targetPath: '/tpls/login/pages/setPassword/index'
      },
      {
        desc: '隐私政策',
        targetPath: '/pages/index/index',
      },
    ]
  },
  userinfo: {
    avatarKey: 'avatar',
    usernameKey: 'username',
    genderKey: 'gender',
    sexArray: ['男', '女'],
    genderMap: {man: '男', woman: '女', unknow: '未知',},
    list: [
      [
        {
          key: 'name',
          desc: '安宝宝',
          placeholder: '未设置1',
        },
        {
          key: 'address',
          desc: '地址管理',
          placeholder: '未设置',
          envnt: () => {
            Taro.navigateTo({
              url: '/pages/addressList/index'
            })
          }
        },
      ],
    ]
  }
}

setting.setConfig(mineConfig)




