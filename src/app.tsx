import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss'
import tpls from './tplsRegist'

import Index from './pages/index'

import configStore from './store'

import './app.less'

console.log('tpls--------->>>',tpls)

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  // eslint-disable-next-line react/sort-comp
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/addressList/index',
      'pages/addAddress/index',
      'pages/editAddress/index',
      'pages/login/index',
      'tpls/login/pages/login/index',
      'tpls/login/pages/regist/index',
      'tpls/login/pages/setPassword/index',

      // 个人中心模块
      'tpls/mine/pages/mine/index',
      'tpls/mine/pages/about/index',
      'tpls/mine/pages/userinfo/index',
      'tpls/mine/pages/modifyNick/index',

      // 银行卡模块
      'tpls/bank/pages/bank/index',
      'tpls/bank/pages/addBank/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
