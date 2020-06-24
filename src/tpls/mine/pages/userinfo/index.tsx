import Taro, {Component, Config} from '@tarojs/taro'
import API from '@/api/request'
import {Image, View} from '@tarojs/components'
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
    navigationBarTitleText: '个人信息'
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    console.log('config.userinfo.list', config.userinfo.list)
    return (
      <View className={styles.index}>

        <View className={styles.list}>
          <View className={`${styles.it} ${styles.uni}`}>
            <View className={styles.itL}>
              <View className={styles.desc}>头像</View>
            </View>
            <View className={styles.itR}>
              <Image className={styles.header} src='https://i.loli.net/2020/06/24/PnCt3khiUGcR6qa.png'/>
            </View>
          </View>

          <View className={styles.it}>
            <View className={styles.itL}>
              <View className={styles.desc}>昵称</View>
            </View>
            <View className={styles.itR}>
              <View className={styles.value}>安宝宝</View>
              <Image className={styles.arrow} src='https://i.loli.net/2020/06/24/5ujSchw2LYy8QDp.png'/>
            </View>
          </View>
        </View>

        {config.userinfo.list.map((d, idx) => (
          <View className={styles.list} key={idx}>
            {d.map(t => (
              <View className={styles.it} key={t.desc}>
                <View className={styles.itL}>
                  <View className={styles.desc}>{t.desc}</View>
                </View>
                <View className={styles.itR}>
                  <View className={styles.value}>{t.placeholder}</View>
                  <Image className={styles.arrow} src='https://i.loli.net/2020/06/24/5ujSchw2LYy8QDp.png'/>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    )
  }
}

