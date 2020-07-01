import Taro, {Component, Config} from '@tarojs/taro'
import {View, Switch, Input, Button, Form, Picker, Image} from '@tarojs/components'
import styles from './style.module.less'
import checkedImg from '../../assets/images/check.svg'
import {config} from '../../config'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  isDefault: boolean
  gender: 'man' | 'woman'
  city: string[]
  cityTemp: string
  address: string
  contact: string
  phone: string,
  id: number
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps
}


class Index extends Component<PageOwnProps, PageState> {

  constructor() {
    super()

    this.state = {
      isDefault: false,
      gender: 'man',
      city: [],
      address: '',
      contact: '',
      phone: '',
      cityTemp: '',
      id: 0
    }
  }

  config: Config = {
    navigationBarTitleText: '修改地址'
  }

  componentDidMount() {
    // 接收参数的地方

    if (this.$router.params.data) {
      const params = JSON.parse(this.$router.params.data)
      Taro.setNavigationBarTitle({
        title: '修改地址'
      })

      console.log('params----', params)
      this.setState({
        isDefault: params.isDefault,
        gender: params.gender,
        cityTemp: params.city,
        address: params.address,
        contact: params.contact,
        phone: params.phone,
        id: params.id
      })
    } else {
      Taro.setNavigationBarTitle({
        title: '添加地址'
      })
    }

  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  onFormItemChange = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.setState({[`${e.target.id}`]: e.detail.value})
  }

  onSelectRegion = (e) => {
    const city = e.detail.value
    this.setState({city: e.detail.value, cityTemp: `${city[0]}${city[1]}${city[2]}`})
  }

  changeGender = (gender) => {
    this.setState({gender})
  }

  onSwitchChange = (e) => {
    this.setState({
      isDefault: e.detail.value
    })
  }

  onSubmit = (e) => {
    const {address, contact, phone} = e.detail.value
    const {isDefault, gender, cityTemp, id} = this.state
    if (!cityTemp) {
      Taro.showToast({
        title: '请选择地区',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!address) {
      Taro.showToast({
        title: '请输入详细地址',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!contact) {
      Taro.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!phone) {
      Taro.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
      return
    }

    const data = {
      contacts: contact,//char # 联系人
      gender: gender,//char # 性别
      phone: phone,//char # 手机号
      city: cityTemp,//char # 城市
      address: address,//char # 详细地址
      is_default: isDefault,//boolean # 是否是默认
    }
    if (id) {
      this.updateAddress({...data, id})
    } else {
      this.addAddress(data)
    }
  }

  /**
   * 添加地址
   * @param data
   */
  addAddress = async (data) => {
    Taro.showLoading({title: ''})
    const {status} = await config.modifyAddress.api.addAddress.service({address_info: JSON.stringify(data)})
    if (status === 'ok') {
      Taro.navigateBack()
    }
    Taro.hideLoading()
  }

  /**
   * 修改地址
   * @param data
   */
  updateAddress = async (data) => {
    Taro.showLoading({title: ''})
    const {status} = await config.modifyAddress.api.updateAddress.service({address_info: JSON.stringify(data)})
    if (status === 'ok') {
      Taro.navigateBack()
    }
    Taro.hideLoading()
  }

  render() {
    const {gender, city, address, contact, phone, cityTemp} = this.state

    return (
      <View className={styles.wrapper}>
        <Form className={styles.form} onSubmit={this.onSubmit.bind(this)}>

          <Picker mode='region' id='city' value={city} onChange={this.onSelectRegion.bind(this)}>
            <View className={styles.formItem}>
              <View className={styles.label}>所在地区</View>
              <View className={styles.input}>
                {cityTemp ? cityTemp : <View className={styles.placeholder}>请选择地区</View>}
              </View>
              <Image src='https://i.loli.net/2020/06/24/5ujSchw2LYy8QDp.png' className={styles.arrow}/>
            </View>
          </Picker>


          <View className={styles.formItem}>
            <View className={styles.label}>详细地址</View>
            <Input name='address' value={address} className={styles.input} placeholder='请填写详细地址'/>
          </View>

          <View className={styles.formItem}>
            <View className={styles.label}>联系人</View>
            <Input name='contact' value={contact} className={styles.input} placeholder='请填写联系人'/>
          </View>

          <View className={styles.radio}>
            <View className={styles.radioIt} onClick={this.changeGender.bind(this, 'man')}>
              <View
                className={gender === 'man' ? styles.icon : [`${styles.icon}`, `${styles.uncheck}`].join(' ')}
              >
                <Image src={checkedImg}/>
              </View>
              <View className={styles.desc}>先生</View>
            </View>
            <View className={styles.radioIt} onClick={this.changeGender.bind(this, 'woman')}>
              <View
                className={gender === 'woman' ? styles.icon : [`${styles.icon}`, `${styles.uncheck}`].join(' ')}
              >
                <Image src={checkedImg}/>
              </View>
              <View className={styles.desc}>女士</View>
            </View>
          </View>

          <View className={styles.formItem}>
            <View className={styles.label}>手机号</View>
            <Input name='phone' value={phone} className={styles.input} placeholder='请填写手机号' type='number'/>
          </View>
          <Button className={styles.submit} formType='submit'>修改地址</Button>
        </Form>
        <View className={styles.optItem}>
          <View className={styles.label}>设为默认地址</View>
          <Switch
            className={styles.switch}
            checked={this.state.isDefault}
            onChange={this.onSwitchChange}
            color='#0f89ec'
          />
        </View>
      </View>
    )
  }
}

export default Index
