import Taro, {Component, Config} from '@tarojs/taro'
import {Image, View, Input} from '@tarojs/components'
import {AtFloatLayout} from 'taro-ui'
import "taro-ui/dist/style/components/float-layout.scss"
import styles from './style.module.less'
import {config} from '../../config'
import {setData} from "../../model"
import * as loginModel from "@/tpls/login/model";

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  isOpen: boolean,
  cardList: any[]
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


export default class Index extends Component<IProps, PageState> {


  constructor() {
    super()
    this.state = {
      isOpen: false,
      cardList: []
    }
  }

  componentDidMount() {

  }

  config: Config = {
    navigationBarTitleText: '我的银行卡'
  }

  componentDidShow() {
    this.getCardList()
  }

  componentDidHide() {
  }

  handleClose = () => {

  }

  /**
   * 获取收货地址列表
   */
  getCardList = async () => {
    Taro.showLoading({title: ''})
    const {status, result} = await config.bank.api.getCardList.service()
    Taro.hideLoading()
    if (status === 'ok') {
      setData(config.bank.api.getCardList.model, result.bankcard_list)
      this.setState({
        cardList: result.bankcard_list
      })
    }
  }

  goAddCard = () => {
    Taro.navigateTo({
      url: '/tpls/bank/pages/addBank/index'
    })
  }

  showActionSheet = (id) => {
    Taro.showActionSheet({
      itemList: ['解绑'],
      itemColor: '#FF0000'
    })
      .then(res => {
        if (res.tapIndex === 0) {
          this.removeCard(id)
        }
      })
      .catch(e => {
        console.log('e----->>', e)
      })
  }

  /**
   * 移除银行卡
   * @param id
   */
  removeCard = async (id) => {
    Taro.showLoading({title: ''})
    const {status} = await config.bank.api.removeCard.service({bankcard_id: id})
    Taro.hideLoading()
    if (status === 'ok') {
      this.getCardList()
    }
  }

  /**
   * 选择银行卡
   */
  selectCard = (it) => {
    setData('currCard', it)
    Taro.navigateBack()
  }

  render() {
    const {isOpen, cardList} = this.state
    return (
      <View className={styles.index}>
        <View className={styles.add} onClick={this.goAddCard.bind(this)}>
          <Image className={styles.icon} src='https://i.loli.net/2020/06/28/ZyWL3IocOubxztA.png'/>
          <View className={styles.desc}>添加银行卡</View>
        </View>


        {cardList.map(it => (
          <View
            className={styles.card}
            key={it.number}
            onLongPress={this.showActionSheet.bind(this, it.id)}
            onClick={this.selectCard.bind(this, it)}
          >
            <Image className={styles.bg}/>
            <View className={styles.cardInfo}>
              <Image className={styles.logo}/>
              <View className={styles.info}>
                <View className={styles.name}>中信银行</View>
                <View className={styles.type}>信用卡</View>
              </View>
            </View>
            <View className={styles.number}>
              **** **** **** {it.number.substring(it.number.length - 4)}
            </View>
          </View>
        ))}


        <AtFloatLayout isOpened={isOpen} title='请输入六位数字密码' onClose={this.handleClose.bind(this)}>
          <View className={styles.floatDesc}>请输入支付密码，进行安全验证</View>
          <Input className={styles.input} type='number'/>
        </AtFloatLayout>
      </View>
    )
  }
}

