import Taro, {Component, Config} from '@tarojs/taro'
import {View, Switch, Input, Button, Form} from '@tarojs/components'
import styles from '../addAddress/style.module.less'


type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  isDefault: boolean
  gender: 'man' | 'woman'
  city: string
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
      city: '',
      address: '',
      contact: '',
      phone: ''
    }
  }

  config: Config = {
    navigationBarTitleText: '修改地址'
  }

  componentDidMount() {
    // 接收参数的地方

    const params = this.$router.params ? JSON.parse(this.$router.params.data) : {}
    this.setState({
      isDefault: params.isDefault,
      gender: params.gender,
      city: params.city,
      address: params.address,
      contact: params.contact,
      phone: params.phone
    })
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

  changeGender = (gender) => {
    this.setState({gender})
  }

  onSwitchChange = (e) => {
    this.setState({
      isDefault: e.detail.value
    })
  }

  onSubmit = (e) => {
    const {city, address, contact, phone} = e.detail.value
    const {isDefault, gender} = this.state
    if (!city) {
      Taro.showToast({
        title: '请输入地区',
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
    const {gender, city, address, contact, phone} = this.state

    return (
      <View className={styles.wrapper}>
        <Form className={styles.form} onSubmit={this.onSubmit.bind(this)}>

          <View className={styles.formItem}>
            <View className={styles.label}>所在地区</View>
            <Input
              id='city'
              name='city' value={city} className={styles.input} placeholder='请选择地区'
              onInput={this.onFormItemChange.bind(this)}/>
          </View>

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
              </View>
              <View className={styles.desc}>先生</View>
            </View>
            <View className={styles.radioIt} onClick={this.changeGender.bind(this, 'woman')}>
              <View
                className={gender === 'woman' ? styles.icon : [`${styles.icon}`, `${styles.uncheck}`].join(' ')}
              >
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
