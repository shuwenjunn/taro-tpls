import Taro from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import checkImg from './images/check.svg'
import styles from './style.module.less'


export default function (props: { isCheck: boolean }) {
  return (
    <View className={props.isCheck ? styles.radio : `${styles.radio} ${styles.disabled}`}>
      <Image src={checkImg}/>
    </View>
  )
}
