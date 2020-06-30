import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import styles from './style.module.less'
import checkedImg from '../../assets/images/check.svg'

interface RadioIt {
  text: string
  value: string
}

interface RadioProps {
  onGetRadioValue(value: string): void

  radioData: Array<RadioIt>
  initValue?: string
}

interface Istate {
  value: string
}

export default class RadioItem extends Component<RadioProps, Istate> {

  state = {
    value: ''
  }

  onChange = (value) => {
    this.setState({value})
    this.props.onGetRadioValue(value)
  }

  componentDidMount() {
    if (this.props.initValue) {
      this.setState({value: this.props.initValue})
    }
  }


  render() {
    const {value} = this.state
    const {radioData = []} = this.props
    return (
      <View className={styles.radio}>
        {radioData.map(d => (
          <View className={styles.radioIt} key={d.value} onClick={this.onChange.bind(this, d.value)}>
            <View
              className={value === d.value ? styles.icon : [`${styles.icon}`, `${styles.uncheck}`].join(' ')}
            >
              {value === d.value && <Image className={styles.icon} src={checkedImg} />}
            </View>
            <View className={styles.desc}>{d.text}</View>
          </View>
        ))}
      </View>
    )
  }
}
