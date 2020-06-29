import Taro, {Component, Config} from '@tarojs/taro'
import {View, Input, Text} from '@tarojs/components'
import styles from './style.module.less'
import {config} from '../../config'


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
    navigationBarTitleText: '提现'
  }

  componentDidShow() {
  }

  componentDidHide() {
  }


  render() {
    return (
      <View className={styles.index}>
        <View className={styles.top}>
          <View className={styles.subTitle}>提现金额</View>
          <View className={styles.inputArea}>
            <View className={styles.symbol}>￥</View>
            <Input type='number' placeholderClass={styles.placeholder} placeholder={`可提现余额${'8000'}`}
              className={styles.input}
            />
          </View>
          <View className={styles.footer}>
            当前账户字长8000元
          </View>
        </View>

        <View className={styles.card}>
          <View className={styles.subTitle}>
            <View className={styles.subTitleL}>到账方式</View>
            <View className={styles.subTitleR}>
              <View className={styles.icon}>
              </View>
              <View className={styles.text}>添加银行卡</View>
            </View>
          </View>

          <View className={styles.cardArea}>
            <View className={styles.cardIt}>
              <View className={styles.l}>工商银行（*****3333）</View>
              <View className={styles.r}></View>
            </View>
            <View className={styles.cardIt}>
              <View className={styles.l}>工商银行（*****3333）</View>
              <View className={styles.r}></View>
            </View>
          </View>

          <View className={styles.other}>
            <View className={styles.it}>
              <View className={styles.l}>
                <View className={styles.icon}> </View>
                <Text>支付宝</Text>
              </View>
              <View className={styles.r}>待开放</View>
            </View>
            <View className={styles.it}>
              <View className={styles.l}>
                <View className={styles.icon}> </View>
                <Text>微信</Text>
              </View>
              <View className={styles.r}>待开放</View>
            </View>
          </View>
        </View>

        <View className={styles.submit}>提现</View>
      </View>
    )
  }
}

