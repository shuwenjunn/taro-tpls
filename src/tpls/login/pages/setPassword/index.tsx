import Taro, { Component, Config } from '@tarojs/taro'
import API from '@/api/request'
import { Button, Form, Input, View } from '@tarojs/components'
import styles from '../login/style.module.less'
import * as service from '../../../../pages/login/service'
import { config } from '../../config'
import { setData } from '../../model'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  loading: boolean
  type: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


export default class Index extends Component<IProps, PageState> {

  constructor() {
    super()
    this.state = {
      loading: false,
      type: ''
    }
  }

  config: Config = {
    navigationBarTitleText: ''
  }

  componentDidMount() {
    Taro.setNavigationBarTitle({
      title: this.$router.params.type === 'modifyPassword' ? '修改密码' : '设置密码'
    })
    if (this.$router.params.type) {
      this.setState({
        type: this.$router.params.type
      })
    }
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  //点击提交按钮
  onSubmit = async (e) => {
    const { oldPassword, password, passwordConfirm } = e.detail.value
    if (this.state.type === 'modifyPassword') {
      if (!oldPassword) {
        Taro.showToast({
          title: '请输入原密码',
          icon: 'none',
          duration: 2000
        })
        return
      }
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

    this.setState({ loading: true })
    const { status, result } = await service.login({ password, passwordConfirm })
    this.setState({ loading: false })
    if (status === 200) {
      setData(config.login.api.phoneCodeLogin.model, null)
      Taro.navigateBack()
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
    const { type } = this.state
    return (
      <View className={styles.index}>
        <Form className={styles.formWrapper} onSubmit={this.onSubmit.bind(this)}>

          {type !== 'modifyPassword' && <View className={styles.skip} onClick={this.skip.bind(this)}>跳过</View>}

          {type === 'modifyPassword' && (
            <View className={`${styles.formItem}`}>
              <Input className={styles.input} name='oldPassword' password placeholder='请输入原密码' />
            </View>
          )}
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
            {type === 'modifyPassword' ? '修改密码' : '设置密码'}
          </Button>
        </Form>
      </View>
    )
  }
}

