import Taro, {Component, Config} from '@tarojs/taro'
import {View, Switch, Input, Button, Form, Picker,Image} from '@tarojs/components'
import styles from './style.module.less'
import checkedImg from '../../assets/images/check.svg'

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
  phone: string
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
      cityTemp: ''
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
      this.setState({
        isDefault: params.isDefault,
        gender: params.gender,
        cityTemp: params.cityTemp,
        address: params.address,
        contact: params.contact,
        phone: params.phone
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
    const {address, contact, phone, cityTemp} = e.detail.value
    const {isDefault, gender} = this.state
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
    const addressData = Taro.getStorageSync('addressData') ? JSON.parse(Taro.getStorageSync('addressData')) : []
    addressData.push({...e.detail.value, isDefault, gender})
    Taro.setStorageSync('addressData', JSON.stringify(addressData))
    Taro.navigateBack()
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
                {city.length > 0 ? cityTemp : <View className={styles.placeholder}>请选择地区</View>}
              </View>
              <Image src='https://i.loli.net/2020/06/24/5ujSchw2LYy8QDp.png' className={styles.arrow} />
            </View>
          </Picker>


          <View className={styles.formItem}>
            <View className={styles.label}>详细地址</View>
            <Input name='address' value={address} className={styles.input} placeholder='请填写详细地址' />
          </View>

          <View className={styles.formItem}>
            <View className={styles.label}>联系人</View>
            <Input name='contact' value={contact} className={styles.input} placeholder='请填写联系人' />
          </View>

          <View className={styles.radio}>
            <View className={styles.radioIt} onClick={this.changeGender.bind(this, 'man')}>
              <View
                className={gender === 'man' ? styles.icon : [`${styles.icon}`, `${styles.uncheck}`].join(' ')}
              >
                <Image src={checkedImg} />
              </View>
              <View className={styles.desc}>先生</View>
            </View>
            <View className={styles.radioIt} onClick={this.changeGender.bind(this, 'woman')}>
              <View
                className={gender === 'woman' ? styles.icon : [`${styles.icon}`, `${styles.uncheck}`].join(' ')}
              >
                <Image src={checkedImg} />
              </View>
              <View className={styles.desc}>女士</View>
            </View>
          </View>

          <View className={styles.formItem}>
            <View className={styles.label}>手机号</View>
            <Input name='phone' value={phone} className={styles.input} placeholder='请填写手机号' type='number' />
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
