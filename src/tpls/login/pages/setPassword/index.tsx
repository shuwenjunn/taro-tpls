import Taro, { Component, Config } from '@tarojs/taro'
import API from '@/api/request'
import { Button, Form, Input, View } from '@tarojs/components'
import styles from '../login/style.module.less'
import * as service from '../../../../pages/login/service'


type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  loading: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


export default class Index extends Component<IProps, PageState> {

  constructor() {
    super()
    this.state = {
      loading: false,
    }
  }

  config: Config = {
    navigationBarTitleText: '设置密码'
  }

  componentDidMount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  //点击提交按钮
  onSubmit = async (e) => {
    const { password, passwordConfirm } = e.detail.value
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

    this.setState({ loading: true })
    const { status, result } = await service.login({ password, passwordConfirm })
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

  skip = () => {
    Taro.navigateTo({
      url: '/pages/index/index'
    })
  }

  render() {
    return (
      <View className={styles.index}>
        <Form className={styles.formWrapper} onSubmit={this.onSubmit.bind(this)}>

          <View className={styles.skip} onClick={this.skip.bind(this)}>跳过</View>

          <View className={`${styles.formItem} ${styles.nomargin}`}>
            <Input className={styles.input} name='password' password placeholder='请设置密码' />
          </View>
          <View className={styles.formItem}>
            <Input className={styles.input} name='passwordConfirm' password placeholder='请确认密码' />
          </View>

          <Button
            className={styles.submit}
            formType='submit'
            loading={this.state.loading}
            disabled={this.state.loading}
            plain
          >
            设置密码
          </Button>
        </Form>
      </View>
    )
  }
}

