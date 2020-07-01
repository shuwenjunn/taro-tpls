import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import styles from './style.module.less'
import {AddressCard} from '../../components/AddressCard'
import {config} from '../../config'
import {setData} from '../../model'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  addressList: Array<any>
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
    this.getAddressList()
  }

  componentDidHide() {
  }

  goAddAddress() {
    Taro.navigateTo({
      url: '/tpls/address/pages/addAddress/index'
    })
  }

  onSelect = (currAddress) => {
    setData('currAddress', currAddress)
    Taro.navigateBack()
  }

  /**
   * 获取收货地址列表
   */
  getAddressList = async () => {
    Taro.showLoading({title: ''})
    const {status, result} = await config.address.api.getAddress.service()
    Taro.hideLoading()
    if (status === 'ok') {
      setData('addressData', result.address_list)
      this.setState({
        addressList: result.address_list
      })
    }
  }

  render() {
    const {addressList} = this.state
    return (
      <View className={styles.address}>
        {addressList.map(d => (
          <AddressCard
            key={d.phone}
            contact={d.contacts}
            address={d.address}
            phone={d.phone}
            city={d.city}
            gender={d.gender}
            isDefault={d.is_default}
            onSelect={this.onSelect.bind(this)}
          />
        ))}
        <View className={styles.footer}>
          <View className={styles.submit} onClick={this.goAddAddress.bind(this)}>添加地址</View>
        </View>
      </View>
    )
  }
}

export default Index
