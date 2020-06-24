import Taro, { Component, Config } from '@tarojs/taro'
import API from '@/api/request'
import { Button, Form, Input, View } from '@tarojs/components'
import styles from '../login/style.module.less'
import * as service from '../../../../pages/login/service'


type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {

}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


export default class Index extends Component<IProps, PageState> {


  constructor() {
    super()
    this.state = {

    }
  }

  componentDidMount() {

  }

  config: Config = {
    navigationBarTitleText: '我的'
  }

  componentDidShow() {
  }

  componentDidHide() {
  }








  render() {

    return (
      <View className={styles.index}>
        <View></View>
      </View>
    )
  }
}

