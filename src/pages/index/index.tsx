import {ComponentClass} from 'react'
import Taro, {Component, Config} from '@tarojs/taro'
import {View, Button} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {add, minus, asyncAdd} from '../../store/actions/counter'
import API from '@/api/request'
import * as addressModel from '@/tpls/address/model'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps
}

@connect(({counter}) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
  dec() {
    dispatch(minus())
  },
  asyncAdd() {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    super()
    this.state = {
      currAddress: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  componentDidShow() {
    this.setState({
      currAddress: Taro.getStorageSync('currAddress') ? JSON.parse(Taro.getStorageSync('currAddress')) : {}
    })
  }

  componentDidHide() {
  }

  goSelect = () => {
    Taro.navigateTo({
      url: '/pages/addressList/index'
    })
  }

  goLogin = () => {
    Taro.navigateTo({
      url: '/tpls/login/pages/login/index',
    })
  }

  goModifyPassword = () => {
    Taro.navigateTo({
      url: '/tpls/login/pages/setPassword/index?type=modifyPassword',
    })
  }

  goBank = () => {
    Taro.navigateTo({
      url: '/tpls/bank/pages/bank/index',
    })
  }

  goBill = () => {
    Taro.navigateTo({
      url: '/tpls/bill/pages/billList/index',
    })
  }

  goWebView = () => {
    Taro.navigateTo({
      url: '/pages/webview/index'
    })
  }

  render() {
    const token = API.getToken()
    return (
      <View className='index'>

        {token.access_token ? JSON.stringify(token) : (
          <Button type='primary' onClick={this.goLogin.bind(this)}>登陆</Button>
        )}
        <Button type='primary' onClick={this.goModifyPassword.bind(this)}>修改密码</Button>

        <Button
          type='primary'
          onClick={() => {
            Taro.navigateTo({
              url: '/tpls/mine/pages/mine/index',
            })
          }}
        >
          个人中心
        </Button>
        <Button
          type='primary'
          onClick={this.goBank.bind(this)}
        >
          银行卡
        </Button>
        <Button
          type='primary'
          onClick={this.goBill.bind(this)}
        >
          账单
        </Button>
        <Button
          type='primary'
          onClick={() => {
            Taro.navigateTo({url: '/tpls/address/pages/addressList/index'})
          }}
        >
          地址管理
        </Button>
        <View>
          当前默认地址：{addressModel.getData('currAddress') && JSON.stringify(addressModel.getData('currAddress'))}
        </View>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
