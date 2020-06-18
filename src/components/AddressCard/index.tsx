import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import styles from './style.module.less'

export interface AddressCardprops {
  onSelect(props: AddressCardprops): void
  contact: string
  phone: string
  city: string
  address: string
  gender: 'man' | 'woman'
  isDefault: boolean
}

export class AddressCard extends Component<AddressCardprops, {}> {

  goEditAddress = (e) => {
    e.stopPropagation()
    Taro.navigateTo({
      url: '/pages/editAddress/index?data=' + JSON.stringify(this.props)
    })
  }


  render() {
    console.log('this.props', this.props)
    return (
      <View className={styles.address_card} onClick={() => this.props.onSelect(this.props)}>
        <View className={styles.header}>
          <View className={styles.name}>{this.props.contact}</View>
          <View className={styles.phone}>{this.props.phone}</View>
        </View>
        <View className={styles.content}>
          {this.props.city + this.props.address}
        </View>
        <View className={styles.footer}>
          <View className={styles.check}>
            <View className={styles.icon}></View>
            <View className={styles.text}>默认地址</View>
          </View>
          <View className={styles.opt} onClick={this.goEditAddress.bind(this)}>
            <Text>编辑</Text>
          </View>
        </View>
      </View>
    )
  }
}
