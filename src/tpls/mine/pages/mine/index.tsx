import Taro, {Component, Config} from '@tarojs/taro'
import {Image, View} from '@tarojs/components'
import API from "@/api/request"
import styles from './style.module.less'
import defaultAvatar from '../../assets/images/avatar.svg'
import arrowIcon from '../../assets/images/arrow.svg'
import {config} from '../../config'
import {setData, getData} from '../../model'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  renderFlag: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


export default class Index extends Component<IProps, PageState> {


  constructor() {
    super()
    this.state = {
      renderFlag: false
    }
  }

  componentDidMount() {
    const token = API.getToken()
    if (token.access_token) {
      this.getUserInfo()
    }
  }

  getUserInfo = async () => {
    const {status, result} = await config.mine.api.getUserInfo.service()
    if (status === 'ok') {
      console.log('result.customer_info', result.customer_info)
      config.mine.api.getUserInfo.model && setData(config.mine.api.getUserInfo.model, result.customer_info)
      this.toggleFlag()
    }
  }

  config: Config = {
    navigationBarTitleText: '我的'
  }

  componentDidShow() {
    this.toggleFlag()
  }

  toggleFlag = () => {
    this.setState({
      renderFlag: !this.state.renderFlag
    })
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

  goUserInfo = () => {
    if (API.getToken().access_token) {
      Taro.navigateTo({
        url: '/tpls/mine/pages/userinfo/index'
      })
    } else {
      Taro.navigateTo({
        url: '/tpls/login/pages/login/index'
      })
    }
  }

  /**
   * 退出登陆
   */
  exit = () => {
    Taro.showActionSheet({
      itemList: ['退出登录'],
      itemColor: '#FF0000'
    })
      .then(res => {
        if (res.tapIndex === 0) {
          this.logout()
          this.toggleFlag()
        }
      })
      .catch(err => {
        console.log('err----->>', err)
      })

  }

  /**
   * 退出登陆
   */
  logout = async () => {
    Taro.showLoading({title: ''})
    const {status} = await config.mine.api.exitLogin.service()
    Taro.hideLoading()
    if (status === 'ok') {
      API.removeToken()
      this.toggleFlag()
    }
  }

  render() {
    const userinfo = getData(config.mine.api.getUserInfo.model)
    const token = API.getToken()
    return (
      <View className={styles.index}>
        <View className={styles.header} onClick={this.goUserInfo.bind(this)}>
          <View className={styles.headerL}>
            <Image
              className={styles.avatar}
              src={userinfo[config.mine.avatarKey] && token.access_token ? userinfo[config.mine.avatarKey] : defaultAvatar}
            />
            <View
              className={styles.name}
            >{token.access_token ? (userinfo[config.mine.usernameKey] || '修改个人信息') : '未登录'}</View>
          </View>
          <Image className={styles.headerR} src={arrowIcon}/>
        </View>

        {config.mine.blocks.length > 0 && config.mine.blocks.map(d => (
          <View className={styles.card} key={d.subTitle}>
            <View className={styles.subtitle}>{d.subTitle}</View>

            <View className={styles.items}>
              {d.items.length > 0 && d.items.map(t => (
                <View className={styles.it} style={{width: `${(100 / d.maxCountInline)}%`}} key={t.desc}
                      onClick={this.switchPage.bind(this, t)}
                >
                  <Image className={styles.icon} src={t.iconPath}/>
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
                  <Image className={styles.icon} src={t.iconPath}/>
                  <View className={styles.desc}>{t.desc}</View>
                </View>
                <Image className={styles.itR} src={arrowIcon}/>
              </View>
            ))}

          </View>
        ))}

        {token.access_token && (
          <View className={styles.exit} onClick={this.exit.bind(this)}>
            退出登陆
          </View>
        )}
      </View>
    )
  }
}

