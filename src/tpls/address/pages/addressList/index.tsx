import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import styles from './style.module.less'
import {AddressCard, AddressCardprops} from '../../components/AddressCard'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  addressList: Array<AddressCardprops>
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps
}


class Index extends Component <PageOwnProps, PageState> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '地址管理'
  }

  constructor() {
    super()
    this.state = {
      addressList: []
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  componentDidShow() {
    this.setState({
      addressList: Taro.getStorageSync('addressData') ? JSON.parse(Taro.getStorageSync('addressData')) : []
    })
  }

  componentDidHide() {
  }

  goAddAddress() {
    Taro.navigateTo({
      url: '/tpls/address/pages/addAddress/index'
    })
  }

  onSelect = (currAddress) => {
    Taro.setStorageSync('currAddress', JSON.stringify(currAddress))
    Taro.navigateBack()
  }

  render() {
    const {addressList} = this.state
    return (
      <View className={styles.address}>
        {addressList.map(d => (
          <AddressCard
            key={d.phone}
            contact={d.contact}
            address={d.address}
            phone={d.phone}
            city={d.city}
            gender={d.gender}
            isDefault={d.isDefault}
            onSelect={this.onSelect.bind(this)}
          />
        ))}
        <View className={styles.submit} onClick={this.goAddAddress.bind(this)}>添加地址</View>
      </View>
    )
  }
}

export default Index
