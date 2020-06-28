import Taro, { Component, Config } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import styles from './style.module.less'
import { config } from '../../config'
import { setData } from '../../model'

console.log('config', config)

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  userinfo: {
    [propName: string]: string
  }
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


export default class Index extends Component<IProps, PageState> {


  constructor() {
    super()
    this.state = {
      userinfo: {}
    }
  }

  componentDidMount() {

  }

  getUserInfo = async () => {
    const { status, result } = await config.mine.api.getUserInfo.service()
    if (status === 'ok') {
      config.mine.api.getUserInfo.model && setData(config.mine.api.getUserInfo.model, result)
      this.setState({
        userinfo: result
      })
    }

  }

  config: Config = {
    navigationBarTitleText: '我的'
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  /**
   * 
   * @param res 分享
   */
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


  /**
   * 页面跳转
   * @param data 页面参数
   */
  switchPage = (data: any) => {
    console.log('ttttttttt', data.targetPath)
    let url = data.targetPath
    if (data.params) {
      url += '?params=' + JSON.stringify(data.params)
    }
    console.log('url---------->>', url)
    Taro.navigateTo({
      url: url
    })
  }

  goUserInfo = () => {
    Taro.navigateTo({
      url: '/tpls/mine/pages/userinfo/index'
    })
  }


  render() {
    const { userinfo } = this.state
    return (
      <View className={styles.index}>
        <View className={styles.header} onClick={this.goUserInfo.bind(this)}>
          <View className={styles.headerL}>
            <Image className={styles.avatar} src={userinfo[config.mine.avatarKey] || 'https://i.loli.net/2020/06/24/PnCt3khiUGcR6qa.png'} />
            <View className={styles.name}>{userinfo[config.mine.usernameKey] || '未登录'}</View>
          </View>
          <Image className={styles.headerR} src='https://i.loli.net/2020/06/24/5ujSchw2LYy8QDp.png' />
        </View>

        {config.mine.blocks.length > 0 && config.mine.blocks.map(d => (
          <View className={styles.card} key={d.subTitle}>
            <View className={styles.subtitle}>我的订单</View>

            <View className={styles.items}>
              {d.items.length > 0 && d.items.map(t => (
                <View className={styles.it} style={{width:`${(100/d.maxCountInline)}%`}} key={t.desc} onClick={this.switchPage.bind(this, t)}>
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
              <View className={styles.it} key={t.desc} onClick={this.switchPage.bind(this, t)}>
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
