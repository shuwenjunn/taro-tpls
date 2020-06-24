import Taro, { Component, Config } from '@tarojs/taro'
import API from '@/api/request'
import { Button, Image, View } from '@tarojs/components'
import styles from './style.module.less'
import { config } from '../../config'

console.log('config', config)

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

  // bug
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  }




  render() {

    return (
      <View className={styles.index}>
        <View className={styles.header}>
          <View className={styles.headerL}>
            <Image className={styles.avatar} src='https://i.loli.net/2020/06/24/PnCt3khiUGcR6qa.png' />
            <View className={styles.name}>大胖子</View>
          </View>
          <Image className={styles.headerR} src='https://i.loli.net/2020/06/24/5ujSchw2LYy8QDp.png' />
        </View>

        {config.mine.blocks.length > 0 && config.mine.blocks.map(d => (
          <View className={styles.card} key={d.subTitle}>
            <View className={styles.subtitle}>我的订单</View>

            <View className={styles.items}>
              {d.items.length > 0 && d.items.map(t => (
                <View className={styles.it} key={t.desc}>
                  <Image className={styles.icon} src={t.iconPath} />
                  <View className={styles.desc}>{t.desc}</View>
                </View>
              ))}

            </View>
          </View>
        ))}

        {config.mine.list.length > 0 && config.mine.list.map((d, idx) => (
          <View className={styles.list} key={idx}>
            {d.length > 0 && d.map(t => (
              <View className={styles.it} key={t.desc}>
                <View className={styles.itL}>
                  <Image className={styles.icon} src={t.iconPath} />
                  <View className={styles.desc}>{t.desc}</View>
                </View>
                <Image className={styles.itR} src='https://i.loli.net/2020/06/24/5ujSchw2LYy8QDp.png' />
              </View>
            ))}

          </View>
        ))}


        <View className={styles.exit}>
          退出登陆
        </View>
      </View>
    )
  }
}

