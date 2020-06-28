import Taro, { Component, Config } from '@tarojs/taro'
import API from '@/api/request'
import { Input, View } from '@tarojs/components'
import styles from './style.module.less'
import { config } from '../../config'

console.log('config', config)

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  username: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


export default class Index extends Component<IProps, PageState> {


  constructor() {
    super()
    this.state = {
      username: ''
    }
  }

  componentDidMount() {
    if (this.$router.params.username) {
      this.setState({
        username: this.$router.params.username
      })
    }
  }

  config: Config = {
    navigationBarTitleText: '个人信息'
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  onConfirm = async (e) => {
    const { status } = await config.modifyNick.api.modifyUserinfo.service(e.detail.value)
    if (status === 'ok') {
      Taro.navigateBack()
    }
  }

  render() {
    const { username } = this.state
    return (
      <View className={styles.index}>
        <Input className={styles.input} value={username} onConfirm={this.onConfirm.bind(this)} autoFocus />
      </View>
    )
  }
}

