import Taro, { Component, Config } from '@tarojs/taro'
import { Image, View, Input } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'
import "taro-ui/dist/style/components/float-layout.scss"
import styles from './style.module.less'
import { config } from '../../config'

console.log('config', config)

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  isOpen: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


export default class Index extends Component<IProps, PageState> {


  constructor() {
    super()
    this.state = {
      isOpen: false
    }
  }

  componentDidMount() {

  }

  config: Config = {
    navigationBarTitleText: '我的银行卡'
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  handleClose = () => {

  }

  getCardList = async () => {
    const { status, result } = await config.bank.api.getCardList.service()
  }

  onConfirm = (e) => {
    console.log('eeee', e)
  }

  goAddCard = () => {
    Taro.navigateTo({
      url: '/tpls/bank/pages/addBank/index'
    })
  }

  render() {
    const { isOpen } = this.state
    return (
      <View className={styles.index}>
        <View className={styles.add} onClick={this.goAddCard.bind(this)}>
          <Image className={styles.icon} src='https://i.loli.net/2020/06/28/ZyWL3IocOubxztA.png' />
          <View className={styles.desc}>添加银行卡</View>
        </View>

        <View className={styles.card}>
          <Image className={styles.bg} />
          <View className={styles.cardInfo}>
            <Image className={styles.logo} />
            <View className={styles.info}>
              <View className={styles.name}>中信银行</View>
              <View className={styles.type}>信用卡</View>
            </View>
          </View>
          <View className={styles.number}>
            **** **** **** 5926
          </View>
        </View>

        <AtFloatLayout isOpened={isOpen} title='请输入六位数字密码' onClose={this.handleClose.bind(this)}>
          <View className={styles.floatDesc}>请输入支付密码，进行安全验证</View>
          <Input className={styles.input} type='number' />
        </AtFloatLayout>
      </View>
    )
  }
}

