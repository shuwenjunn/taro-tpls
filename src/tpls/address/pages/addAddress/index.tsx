import Taro, { Component, Config } from '@tarojs/taro'
import { View, Switch, Input, Button, Form } from '@tarojs/components'
import { AddressCardprops } from '../../components/AddressCard'
import styles from './style.module.less'
import appStyle from '../../../../app.less'
import RegionPicker from '../../components/RegionPicker'
import RadioItem from '../../components/RadioItem'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps
}


class Index extends Component<PageOwnProps, PageState & Omit<AddressCardprops, 'onSelect'>> {

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

  static options = {
    addGlobalClass: true
  }

  config: Config = {
    navigationBarTitleText: '添加地址'
  }

  componentDidMount() {

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
    this.setState({ [`${e.target.id}`]: e.detail.value })
  }

  changeGender = (gender) => {
    this.setState({ gender })
  }

  onSwitchChange = (e) => {
    this.setState({
      isDefault: e.detail.value
    })
  }

  onSubmit = (e) => {
    const { address, contact, phone } = e.detail.value
    const { isDefault, gender, city } = this.state
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
    addressData.push({ ...e.detail.value, isDefault, gender, city })
    Taro.setStorageSync('addressData', JSON.stringify(addressData))
    Taro.navigateBack()
  }

  onGetRegion = (region) => {
    // 参数region为选择的省市区
    console.log(region.replace(/ - /g, ''))
    this.setState({
      city: region.replace(/ - /g, '')
    })
  }

  onGetRadioValue = (value: string) => {
    this.setState({ gender: value as AddressCardprops['gender'] })
  }

  render() {
    const { city, address, contact, phone } = this.state

    return (
      <View className={styles.wrapper}>
        <Form className={styles.form} onSubmit={this.onSubmit.bind(this)}>

          <View className={styles.formItem}>
            <View className={styles.label}>所在地区</View>
            {/*<Input*/}
            {/*  id='city'*/}
            {/*  name='city' value={city} className={styles.input} placeholder='请选择地区'*/}
            {/*  onInput={this.onFormItemChange.bind(this)}/>*/}

            <RegionPicker
              onGetRegion={this.onGetRegion.bind(this)}
              defaultValue={city}
            />
          </View>

          <View className={styles.formItem}>
            <View className={styles.label}>详细地址</View>
            <Input name='address' value={address} className={styles.input} placeholder='请填写详细地址' />
          </View>

          <View className={styles.formItem}>
            <View className={styles.label}>联系人</View>
            <Input name='contact' value={contact} className={styles.input} placeholder='请填写联系人' />
          </View>

          <RadioItem
            onGetRadioValue={this.onGetRadioValue.bind(this)}
            radioData={[{ text: '男士', value: 'man' }, { text: '女士', value: 'woman' }]}
            initValue='man'
          />

          <View className={styles.formItem}>
            <View className={styles.label}>手机号</View>
            <Input name='phone' value={phone} className={styles.input} placeholder='请填写手机号' type='number' />
          </View>
          <Button className={styles.submit} formType='submit'>保存地址</Button>
        </Form>
        <View className={styles.optItem}>
          <View className={styles.label}>设为默认地址</View>
          <Switch
            className={styles.switch}
            checked={this.state.isDefault}
            onChange={this.onSwitchChange}
            color={appStyle.baseColor}
          />
        </View>
      </View>
    )
  }
}

export default Index
