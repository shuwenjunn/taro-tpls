import Taro, {Component, Config} from '@tarojs/taro'
import {Image, View} from '@tarojs/components'
import styles from './style.module.less'
import {config} from '../../config'


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
    navigationBarTitleText: '关于我们'
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  /**
   *
   * @param res 转发
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

  switchPage = (data: any) => {
    let url = data.targetPath
    if (url.indexOf('http') > -1) {
      Taro.navigateTo({
        url: '/pages/webview/index?src=' + url
      })
    } else {
      if (data.params) {
        url += '?params=' + JSON.stringify(data.params)
      }
      Taro.navigateTo({
        url: url
      })
    }
  }

  render() {

    return (
      <View className={styles.index}>
        <Image className={styles.logo} src='https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' />
        <View className={styles.name}>{config.about.appName}</View>
        <View className={styles.version}>{config.about.version}</View>

        <View className={styles.list}>
          {config.about.list.length > 0 && config.about.list.map(t => (
            <View className={styles.it} key={t.desc} onClick={this.switchPage.bind(this, t)}>
              <View className={styles.itL}>
                <View className={styles.desc}>{t.desc}</View>
              </View>
              <Image className={styles.itR} src='https://i.loli.net/2020/06/24/5ujSchw2LYy8QDp.png' />
            </View>
          ))}
        </View>
      </View>
    )
  }
}

