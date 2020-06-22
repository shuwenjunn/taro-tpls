import Taro, { Component, Config } from '@tarojs/taro'
import API from '@/api/request'
import { Button, Form, Input, View } from '@tarojs/components'
import styles from './style.module.less'
import SlideVerification from '../../plugin/slideVerification'
import * as service from '../../../../pages/login/service'


type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  loading: boolean
  loginType: 'phone' | 'username'
  username: string
  phone: string
  password: string
  countdownTime: number
  verifyVisible: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


export default class Index extends Component<IProps, PageState> {
  private SlideVerification: any
  private timmer: any

  constructor() {
    super()
    this.state = {
      loading: false,
      loginType: 'username',
      verifyVisible: false,
      username: '',
      password: '',
      phone: '',
      countdownTime: 60,
    }
  }

  componentDidMount() {

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

  //点击提交按钮
  onSubmit = (e) => {
    const { loginType } = this.state
    if (loginType === 'phone') {
      this.onPhoneLogin(e.detail.value)
    } else {
      this.onUsernameLogin(e.detail.value)
    }
  }

  onGetCode = () => {
    this.setState({ verifyVisible: true })
  }

  //账号密码登陆
  onUsernameLogin = async (values) => {
    console.log('values', values)
    const { username, password } = values
    if (!username || !password) {
      Taro.showToast({
        title: '请输入账号密码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setState({ verifyVisible: true, username, password })

  }

  // 短信验证码登陆
  onPhoneLogin = async (values: { phone: string; code: string }) => {
    const { phone, code } = values
    if (!phone || !code) {
      Taro.showToast({
        title: '请输入手机号和短信验证码',
        icon: 'none',
        duration: 2000
      })
      return
    }

    // 伪代码
    this.setState({ loading: true, verifyVisible: false })
    const { username, password } = this.state
    const { status, result } = await service.login({ username, password })
    this.setState({ loading: false })
    if (status === 200) {
      API.setToken(result)
      Taro.navigateTo({
        url: '/pages/index/index'
      })
    }
  }

  onInput = (e) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.setState({ [`${e.target.id}`]: e.detail.value })
  }

  /**
   * 切换登陆方式
   */
  switchLoginType = (type: PageState['loginType']) => {
    this.setState({
      loginType: type
    })
  }

  goRegist = (title: string) => {
    Taro.navigateTo({
      url: '/tpls/login/pages/regist/index?title=' + title
    })
  }

  //---------------------图片验证码--------------
  /* 校验成功的回调函数 */
  verifyResult = async (res) => {
    console.log(res)
    if (!res.flag) {
      return
    }
    this.verifyReset()
    const { loginType } = this.state
    if (loginType === 'username') {
      this.setState({ loading: true, verifyVisible: false })
      const { username, password } = this.state
      const { status, result } = await service.login({ username, password })
      this.setState({ loading: false })
      if (status === 200) {
        API.setToken(result)
        Taro.navigateTo({
          url: '/pages/index/index'
        })
      }
    }

    if (loginType === 'phone') {
      this.setState({ verifyVisible: false })
      this.timmer = setInterval(() => {
        const { countdownTime } = this.state
        console.log('countdownTime---------->>', countdownTime)
        if (countdownTime <= 1) {
          clearInterval(this.timmer)
          this.setState({ countdownTime: 60 })
        } else {
          this.setState({ countdownTime: countdownTime - 1 })
        }
      }, 100)
    }
  }

  /* 校验插件重置 */
  verifyReset = () => {
    this.SlideVerification.reset()
  }

  onRef = (ref) => {
    this.SlideVerification = ref
    console.log(ref)
  }

  //---------------------图片验证码--------------

  render() {
    const { loginType, verifyVisible, phone, countdownTime } = this.state
    return (
      <View className={styles.index}>

        <View
          className={verifyVisible ? `${styles.verifyWrapper} ${styles.show}` : `${styles.verifyWrapper} ${styles.hide}`}
        >
          <View className={styles.content}>
            <SlideVerification result={this.verifyResult} onRef={this.onRef} />
          </View>
        </View>
        <Form className={styles.formWrapper} onSubmit={this.onSubmit.bind(this)}>
          {loginType === 'username' ? (
            <View className={styles.formItem}>
              <Input className={styles.input} name='username' type='text' placeholder='请输入账号' />
            </View>
          ) : (
              <View className={styles.formItem}>
                <Input
                  className={styles.input}
                  id='phone'
                  name='phone'
                  type='text'
                  placeholder='请输入手机号'
                  onInput={this.onInput.bind(this)}
                />
              </View>
            )}

          {loginType === 'phone' ? (
            <View className={styles.formItem}>
              <Input className={styles.input} name='code' id='code' password placeholder='请输入验证码' />
              {phone && countdownTime === 60 ? (
                <View className={styles.codeBtn} onClick={this.onGetCode.bind(this)}>获取验证码</View>
              ) : (
                  <View
                    className={`${styles.codeBtn} ${styles.disabled}`}
                  >
                    {countdownTime < 60 ? countdownTime : '获取验证码'}
                  </View>
                )}
            </View>
          ) : (
              <View className={styles.formItem}>
                <Input className={styles.input} name='password' password placeholder='请输入登陆密码' />
              </View>
            )}
          {loginType === 'username' && (
            <View className={styles.opts}>
              <View className={styles.optIt} onClick={this.goRegist.bind(this, '注册')}>注册账号</View>
              <View className={styles.optIt} onClick={this.goRegist.bind(this, '忘记密码')}>忘记密码?</View>
            </View>
          )}
          <Button
            className={styles.submit}
            formType='submit'
            loading={this.state.loading}
            disabled={this.state.loading}
            plain
          >
            {this.state.loading ? '登陆中...' : '登陆'}
          </Button>
          {loginType === 'username' ? (
            <View className={styles.toggle} onClick={this.switchLoginType.bind(this, 'phone')}>验证码登陆</View>
          ) : (
              <View className={styles.toggle} onClick={this.switchLoginType.bind(this, 'username')}>账号密码登陆</View>
            )}
        </Form>
      </View>
    )
  }
}

