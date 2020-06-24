import Taro, { Component, Config } from '@tarojs/taro'
import API from '@/api/request'
import { Input, View } from '@tarojs/components'
import styles from './style.module.less'
import { config } from '../../config'

console.log('config', config)

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


export default class Index extends Component<IProps, PageState> {


  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {

  }

  config: Config = {
    navigationBarTitleText: '个人信息'
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  onConfirm = (e) => {
    console.log('eeeeee', e.detail.value)
  }

  render() {
    console.log('config.userinfo.list', config.userinfo.list)
    return (
      <View className={styles.index}>
        <Input className={styles.input} onConfirm={this.onConfirm.bind(this)} autoFocus />
      </View>
    )
  }
}

