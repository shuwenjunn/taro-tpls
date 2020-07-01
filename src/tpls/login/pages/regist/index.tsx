import Taro, {Component, Config} from '@tarojs/taro'
import md5 from 'js-md5'
import {Button, Form, Input, View} from '@tarojs/components'
import styles from '../login/style.module.less'
import {config} from '../../config'
import SlideVerification from '../../plugin/slideVerification'
import API from "@/api/request";


type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  loading: boolean
  phone: string
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
      verifyVisible: false,
      phone: '',
      countdownTime: 60,
    }
  }

  config: Config = {
    navigationBarTitleText: ''
  }

  componentDidMount() {
    Taro.setNavigationBarTitle({title: this.$router.params.title})
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  //点击提交按钮
  onSubmit = async (e) => {
    const {phone, code, password, passwordConfirm} = e.detail.value
    // 伪代码
    if (!phone) {
      Taro.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!code) {
      Taro.showToast({
        title: '请输入短信验证码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!password) {
      Taro.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!passwordConfirm) {
      Taro.showToast({
        title: '请确认密码',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (password !== passwordConfirm) {
      Taro.showToast({
        title: '密码不一致',
        icon: 'none',
        duration: 2000
      })
      return
    }

    this.setState({loading: true})
    try {
      const {status, result} = await config.regist.api.customerAccountRegister.service(phone, code, md5(password))
      console.log('status,result', status, result)
      if (status === 'ok') {
        API.setToken(result)
        Taro.navigateBack()
      }
    } catch (e) {
      console.log('err----->', e)
    }
    this.setState({loading: false})
  }

  onGetCode = async () => {
    const {result} = await config.commonApi.getPhoneCode(this.state.phone)
    if (result.status === 'ok') {
      Taro.showToast({
        title: '短信验证码发送成功',
        icon: 'success',
        duration: 2000
      })
    }
    this.timmer = setInterval(() => {
      const {countdownTime} = this.state
      if (countdownTime <= 1) {
        clearInterval(this.timmer)
        this.setState({countdownTime: 60})
      } else {
        this.setState({countdownTime: countdownTime - 1})
      }
    }, 1000)
  }

  // 短信验证码登陆
  onPhoneLogin = async (values: { phone: string; code: string }) => {
    const {phone, code} = values
    if (!phone || !code) {
      Taro.showToast({
        title: '请输入手机号和短信验证码',
        icon: 'none',
        duration: 2000
      })
      return
    }
  }

  onInput = (e) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.setState({[`${e.target.id}`]: e.detail.value})
  }

  //---------------------图片验证码--------------
  /* 校验成功的回调函数 */
  verifyResult = async (res) => {
    if (!res.flag) {
      return
    }
    this.setState({verifyVisible: false})
    this.timmer = setInterval(() => {
      const {countdownTime} = this.state
      if (countdownTime <= 1) {
        clearInterval(this.timmer)
        this.setState({countdownTime: 60})
      } else {
        this.setState({countdownTime: countdownTime - 1})
      }
    }, 100)
  }

  /* 校验插件重置 */
  verifyReset = () => {
    this.SlideVerification.reset()
  }

  onRef = (ref) => {
    this.SlideVerification = ref
  }

  //---------------------图片验证码--------------

  render() {
    const {verifyVisible, phone, countdownTime} = this.state
    return (
      <View className={styles.index}>

        <View
          className={verifyVisible ? `${styles.verifyWrapper} ${styles.show}` : `${styles.verifyWrapper} ${styles.hide}`}
        >
          <View className={styles.content}>
            <SlideVerification result={this.verifyResult} onRef={this.onRef}/>
          </View>
        </View>
        <Form className={styles.formWrapper} onSubmit={this.onSubmit.bind(this)}>
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

          <View className={styles.formItem}>
            <Input className={styles.input} name='code' id='code' type='number' placeholder='请输入验证码'/>
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

          <View className={styles.formItem}>
            <Input className={styles.input} name='password' password placeholder='请设置密码'/>
          </View>
          <View className={styles.formItem}>
            <Input className={styles.input} name='passwordConfirm' password placeholder='请确认密码'/>
          </View>

          <Button
            className={styles.submit}
            formType='submit'
            loading={this.state.loading}
            disabled={this.state.loading}
            plain
          >
            {this.$router.params.title === '注册' ? '注册' : '重置密码'}
          </Button>
        </Form>
      </View>
    )
  }
}

