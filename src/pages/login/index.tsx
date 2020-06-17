import Taro, {Component, Config} from '@tarojs/taro'
import {View, Form, Input, Image, Button} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import API from "@/api/request"
import styles from './style.module.less'
import * as service from './service'
import {add, minus, asyncAdd} from '../../store/actions/counter'

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => void
}

type PageOwnProps = {}

type PageState = {
  loading: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

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
class Index extends Component<IProps, PageState> {

  state = {
    loading: false
  }

  componentDidMount() {
    console.log(this.$router)
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps, styles)
  }

  componentWillUnmount() {
  }

  config: Config = {
    navigationBarTitleText: '登陆'
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  async add() {
    const a = await new Promise((resolve) => {
      setTimeout(() => {
        resolve('1111')
      }, 1000)
    })
    console.log(a)
  }

  onSubmit = async (e) => {
    const {username, passowrd} = e.detail.value
    console.log(e.detail.value)
    if (!username || !passowrd) {
      Taro.showToast({
        title: '请输入账号密码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setState({
      loading: true
    })
    const {status, result} = await service.login(e.detail.value)
    this.setState({loading: false})
    if (status === 200) {
      API.setToken(result)
      Taro.navigateTo({
        url: '/pages/index/index'
      })
    }
  }

  render() {
    return (
      <View className={styles.login}>
        <View className={styles.logo}></View>
        <Form className={styles.formWrapper} onSubmit={this.onSubmit.bind(this)}>
          <View className={styles.formItem}>
            <Image className={styles.icon} src={require('../../assets/images/username.svg')}/>
            <Input className={styles.input} name='username' type='text' placeholder='请输入用户名' focus/>
          </View>
          <View className={styles.formItem}>
            <Image className={styles.icon} src={require('../../assets/images/password.svg')}/>
            <Input className={styles.input} name='passowrd' password placeholder='请输入密码'/>
          </View>
          <Button className={styles.submit} formType='submit' loading={this.state.loading} disabled={this.state.loading}
                  plain>{this.state.loading ? '登陆中...' : '登陆'}</Button>
        </Form>
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
export default Index
