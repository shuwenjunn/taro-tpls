import Taro, { Component, Config } from '@tarojs/taro'
import { Image, View, Picker, Button, Input } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import "taro-ui/dist/style/components/modal.scss"
import styles from './style.module.less'
import { config } from '../../config'
import * as model from '../../model'

console.log('config', config)

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  gender: number
  visible: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


export default class Index extends Component<IProps, PageState> {


  constructor() {
    super()
    this.state = {
      gender: 0,
      visible: false,
    }
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
    if (data.params) {
      url += '?params=' + JSON.stringify(data.params)
    }
    Taro.navigateTo({
      url: url
    })
  }

  onSelect = (e) => {
    console.log('33333', e)
  }

  onSubmit = () => {
    this.setState({ visible: false })
  }


  render() {
    console.log('config.userinfo.list', config.userinfo.list)
    const { gender, visible } = this.state
    return (
      <View className={styles.index}>

        <View className={styles.list}>
          <View className={`${styles.it} ${styles.uni}`}>
            <View className={styles.itL}>
              <View className={styles.desc}>头像</View>
            </View>
            <View className={styles.itR}>
              <Image className={styles.header} src='https://i.loli.net/2020/06/24/PnCt3khiUGcR6qa.png' />
            </View>
          </View>

          <View className={styles.it} onClick={this.modifyNickName.bind(this)}>
            <View className={styles.itL}>
              <View className={styles.desc}>昵称</View>
            </View>
            <View className={styles.itR}>
              <View className={styles.value}>安宝宝</View>
              <Image className={styles.arrow} src='https://i.loli.net/2020/06/24/5ujSchw2LYy8QDp.png' />
            </View>
          </View>
          <Picker mode='selector' value={0} range={config.userinfo.sexArray} onChange={this.onSelect.bind(this)}>
            <View className={styles.it}>
              <View className={styles.itL}>
                <View className={styles.desc}>性别</View>
              </View>
              <View className={styles.itR}>
                <View className={styles.value}>{config.userinfo.genderMap[model.getData('userinfo')[config.userinfo.genderKey]] || '未知'}</View>
                <Image className={styles.arrow} src='https://i.loli.net/2020/06/24/5ujSchw2LYy8QDp.png' />
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
                  <Image className={styles.arrow} src='https://i.loli.net/2020/06/24/5ujSchw2LYy8QDp.png' />
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
            <Input className={styles.input} placeholder='请输入昵称' />
          </View>
          <AtModalAction>
            <View className={styles.submit} onClick={this.onSubmit.bind(this)}>确定</View>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}

