import Taro, {Component, Config} from '@tarojs/taro'
import {Image, View, Picker, Input} from '@tarojs/components'
import {AtModal, AtModalHeader, AtModalAction} from "taro-ui"
import defaultAvatar from '../../assets/images/avatar.svg'
import arrowIcon from '../../assets/images/arrow.svg'
import "taro-ui/dist/style/components/modal.scss"
import styles from './style.module.less'
import {config} from '../../config'
import {setData, getData} from '../../model'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  gender: number
  visible: boolean
  renderFlag: boolean
  nickname: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


export default class Index extends Component<IProps, PageState> {


  constructor() {
    super()
    this.state = {
      gender: 0,
      visible: false,
      renderFlag: false,
      nickname: ''
    }
  }

  componentDidMount() {
    this.setState({
      nickname: getData(config.mine.api.getUserInfo.model)[config.mine.usernameKey]
    })
  }

  config: Config = {
    navigationBarTitleText: '个人信息'
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  // 修改昵称
  modifyNickName = () => {
    this.setState({
      visible: true
    })
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

  /**
   * 修改性别
   * @param e
   */
  onSelect = (e) => {
    const map = {
      '0': 'man',
      '1': 'woman'
    }
    this.updateUserinfo({gender: map[e.detail.value]})
  }

  /**
   * 修改昵称
   */
  onSubmit = () => {
    this.updateUserinfo({name: this.state.nickname})
    this.setState({visible: false,})
  }

  /**
   * 修改用户信息
   * @param data
   */
  updateUserinfo = async (data) => {
    Taro.showLoading({title: '修改中'})
    const {status} = await config.userinfo.api.updateUserInfo.service({myself_info: JSON.stringify(data)})
    if (status === 'ok') {
      this.getUserInfo()
    }
    Taro.hideLoading()
  }

  getUserInfo = async () => {
    const {status, result} = await config.mine.api.getUserInfo.service()
    if (status === 'ok') {
      console.log('result.customer_info', result.customer_info)
      config.mine.api.getUserInfo.model && setData(config.mine.api.getUserInfo.model, result.customer_info)
      this.toggleFlag()
    }
  }

  toggleFlag = () => {
    this.setState({
      renderFlag: !this.state.renderFlag
    })
  }

  render() {
    const {visible, nickname} = this.state
    const userinfo = getData(config.mine.api.getUserInfo.model)
    return (
      <View className={styles.index}>

        <View className={styles.list}>
          <View className={`${styles.it} ${styles.uni}`}>
            <View className={styles.itL}>
              <View className={styles.desc}>头像</View>
            </View>
            <View className={styles.itR}>
              <Image
                className={styles.header}
                src={userinfo[config.mine.avatarKey] ? userinfo[config.mine.avatarKey] : defaultAvatar}
              />
            </View>
          </View>

          <View className={styles.it} onClick={this.modifyNickName.bind(this)}>
            <View className={styles.itL}>
              <View className={styles.desc}>昵称</View>
            </View>
            <View className={styles.itR}>
              <View className={styles.value}>{userinfo[config.mine.usernameKey] || '未设置'}</View>
              <Image className={styles.arrow} src='https://i.loli.net/2020/06/24/5ujSchw2LYy8QDp.png'/>
            </View>
          </View>
          <Picker mode='selector' value={0} range={config.userinfo.sexArray} onChange={this.onSelect.bind(this)}>
            <View className={styles.it}>
              <View className={styles.itL}>
                <View className={styles.desc}>性别</View>
              </View>
              <View className={styles.itR}>
                <View
                  className={styles.value}
                >{config.userinfo.genderMap[getData('userinfo')[config.userinfo.genderKey]] || '未知'}</View>
                <Image className={styles.arrow} src='https://i.loli.net/2020/06/24/5ujSchw2LYy8QDp.png'/>
              </View>
            </View>
          </Picker>

        </View>

        {config.userinfo.list.map((d, idx) => (
          <View className={styles.list} key={idx}>
            {d.map(t => (
              <View className={styles.it} key={t.desc} onClick={t.envnt && t.envnt.bind(this)}>
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

        <AtModal
          isOpened={visible}
        >
          <AtModalHeader>修改昵称</AtModalHeader>
          <View className={styles.atModalContent}>
            <Input
              className={styles.input}
              onInput={(e) => this.setState({nickname: e.detail.value})}
              placeholder='请输入昵称'
              value={nickname}
            />
          </View>
          <AtModalAction>
            <View className={styles.submit} onClick={this.onSubmit.bind(this)}>确定</View>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}

