import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import "taro-ui/dist/style/components/float-layout.scss"
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
    navigationBarTitleText: '账单详情'
  }

  componentDidShow() {
  }

  componentDidHide() {
  }


  render() {
    const logisticsData = [
      {
        context: '付款成功'
      },
      {
        context: '银行处理中'
      },
      {
        context: '到账成功'
      },
    ]

    return (
      <View className={styles.index}>
        <View className={styles.top}>
          <View className={styles.type}>银行卡充值</View>
          <View className={styles.money}>100.00</View>
          <View className={styles.status}>交易成功</View>
        </View>

        <View className={styles.info}>
          <View className={`${styles.it} ${styles.uni}`}>
            <View className={styles.label}>提现进度</View>
            <View className={styles.step}>
              {logisticsData.map((item, index) => (
                <View className={styles.logisticsIt} key={index}>
                  {index < logisticsData.length - 1 &&
                  <View className={index + 1 <= 1 ? styles.line : `${styles.line} ${styles.gray}`}></View>}
                  <View className={index <= 1 ? styles.dot : `${styles.dot} ${styles.gray}`}></View>
                  <View className={index <= 1 ? styles.content : `${styles.content} ${styles.gray}`}>
                    {item.context}
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View className={styles.it}>
            <View className={styles.label}>提现到</View>
            <View className={styles.value}>招商银行（9809）李盼盼</View>
          </View>
          <View className={styles.it}>
            <View className={styles.label}>提现到</View>
            <View className={styles.value}>招商银行（9809）李盼盼</View>
          </View>
          <View className={styles.it}>
            <View className={styles.label}>提现到</View>
            <View className={styles.value}>招商银行（9809）李盼盼</View>
          </View>
        </View>


      </View>
    )
  }
}

