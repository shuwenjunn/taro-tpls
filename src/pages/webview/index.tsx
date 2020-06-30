import Taro, {Component} from '@tarojs/taro'
import {WebView} from '@tarojs/components'

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => void
}

type PageOwnProps = {}

type PageState = {
  src: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


class Index extends Component<IProps, PageState> {

  constructor(props) {
    super(props)
    this.state = {
      src: ''
    }
  }


  componentDidMount() {
    this.setState({
      src: this.$router.params.src
    })
  }


  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }


  render() {
    return (
      <WebView src={this.state.src}>

      </WebView>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion
export default Index
