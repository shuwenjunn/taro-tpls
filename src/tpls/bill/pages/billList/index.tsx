import Taro, {Component, Config} from '@tarojs/taro'
import moment from 'moment'
import {View, Text, Image, Picker} from '@tarojs/components'
import "taro-ui/dist/style/components/float-layout.scss"
import styles from './style.module.less'
// import {config} from '../../config'
import selectIcon from '../../assets/images/select.svg'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  date: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


export default class Index extends Component<IProps, PageState> {


  constructor() {
    super()
    this.state = {
      date: moment().format('YYYY-MM')
    }
  }

  componentDidMount() {

  }

  config: Config = {
    navigationBarTitleText: '我的钱包'
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  onSelectMonth = (e) => {
    this.setState({
      date: e.detail.value
    })
  }

  goWithdrawal = () => {
    Taro.navigateTo({
      url: '/tpls/bill/pages/withdrawal/index'
    })
  }

  goBillDetail = (type: 'income' | 'output') => {
    Taro.navigateTo({
      url: '/tpls/bill/pages/billDetail/index?type=' + type
    })
  }

  render() {
    const {date} = this.state
    return (
      <View className={styles.index}>
        <View className={styles.header}>
          <View className={styles.name}>
            全部余额（元）
          </View>
          <View className={styles.money}>
            <View className={styles.moneyL}>
              <Text className={styles.symbol}>￥</Text>
              <Text className={styles.number}>20,000</Text>
              <Text className={styles.float}>.00</Text>
            </View>
            <View className={styles.moneyR} onClick={this.goWithdrawal.bind(this)}>提现</View>
          </View>
        </View>

        <View className={styles.subTitle}>
          资金明细
        </View>
        <View
          className={styles.scrollView}
          // scrollY
          // scrollWithAnimation
          // scrollTop={scrollTop}
          // style={scrollStyle}
          // lowerThreshold={Threshold}
          // upperThreshold={Threshold}
          // onScrollToUpper={this.onScrollToUpper.bind(this)} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
          // onScroll={this.onScroll}
        >
          <View className={styles.bar}>
            <Picker mode='date' value={date} fields='month' onChange={this.onSelectMonth.bind(this)}>
              <View className={styles.select}>
                <View className={styles.month}>{date}</View>
                <Image className={styles.icon} src={selectIcon} />
              </View>
            </Picker>
            <View className={styles.statistic}>
              <View className={styles.income}>收入￥8.81</View>
              <View className={styles.output}>支出20,000.00</View>
            </View>
          </View>

          <View className={styles.item} onClick={this.goBillDetail.bind(this, 'income')}>
            <View className={styles.top}>
              <View className={styles.topL}>充值（这是一个备注）</View>
              <View className={styles.topR}>20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item} onClick={this.goBillDetail.bind(this, 'output')}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.bar}>
            <Picker mode='date' value={date} fields='month' onChange={this.onSelectMonth.bind(this)}>
              <View className={styles.select}>
                <View className={styles.month}>{date}222222222</View>
                <Image className={styles.icon} src={selectIcon} />
              </View>
            </Picker>
            <View className={styles.statistic}>
              <View className={styles.income}>收入￥8.81</View>
              <View className={styles.output}>支出20,000.00</View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>
          <View className={styles.item}>
            <View className={styles.top}>
              <View className={styles.topL}>提现（这是一个备注）</View>
              <View className={styles.topR}>-20,000.00</View>
            </View>
            <View className={styles.bottom}>
              <View className={styles.bottomL}>2020-06-27 21:09</View>
              <View className={styles.bottomR}></View>
            </View>
          </View>

        </View>
      </View>
    )
  }
}

