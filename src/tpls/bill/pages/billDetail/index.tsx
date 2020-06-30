import Taro, {Component, Config} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import "taro-ui/dist/style/components/float-layout.scss"
import checkIcon from '../../assets/images/check.svg'
import shenglueIcon from '../../assets/images/shenglue.svg'
import styles from './style.module.less'
import {config} from '../../config'

console.log('config', config)

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  type: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


export default class Index extends Component<IProps, PageState> {


  constructor() {
    super()
    this.state = {
      type: ''
    }
  }

  componentDidMount() {
    this.setState({
      type: this.$router.params.type
    })
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

    const {type} = this.state
    console.log('type', type)
    return (
      <View className={styles.index}>
        <View className={styles.top}>
          <View className={styles.type}>{type === 'income' ? '银行卡充值' : '提现到银行卡'}</View>
          <View className={styles.money}>{type === 'output' ? '-' : ''}100.00</View>
          <View className={type === 'income' ? `${styles.status}` : `${styles.status} ${styles.progress}`}>
            {type === 'income' ? '交易成功' : '处理中'}
          </View>
        </View>

        <View className={styles.info}>
          <View className={`${styles.it} ${styles.uni}`}>
            <View className={styles.label}>提现进度</View>
            <View className={styles.step}>
              {logisticsData.map((item, index) => (
                <View className={styles.logisticsIt} key={index}>
                  {index < logisticsData.length - 1 &&
                  <View className={index + 1 <= 1 ? styles.line : `${styles.line} ${styles.gray}`}></View>}
                  <View className={index <= 1 ? styles.dot : `${styles.dot} ${styles.gray}`}>
                    {index <= 1 ? <Image src={checkIcon} /> : <Image src={shenglueIcon} />}
                  </View>
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

