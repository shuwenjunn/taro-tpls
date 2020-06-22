import Taro, {Component} from '@tarojs/taro'
import {View, Text, MovableArea, MovableView} from '@tarojs/components'
import './index.less'

export default class SlideVerification extends Component {

  state = {
    x: 0,
    oldx: 0,
    isOk: false,
    size: {},
    count: 0,
    isMove: false
  }

  componentWillMount() {
    this.props.onRef(this)
  }

  componentDidMount() {
    Taro.nextTick(() => {
      let size = this.state.size
      console.log(this.state.size)
      this.getSize(".on-pathway").then((res1) => {
        size.pathway = res1;
        this.setState({
          size
        }, () => {
          this.getSize(".on-track").then((res2) => {
            size.track = res2;
            this.setState({
              size
            }, () => {
              console.log(this.state.size)
            })
          });
        })
      })
    })
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  getSize = (selector) => {
    return new Promise((resolve, reject) => {
      let view = Taro.createSelectorQuery().in(this.$scope).select(selector);
      view.fields({
        size: true,
      }, (res) => {
        resolve(res.width);
      }).exec();
    });
  }

  /* 滑动中 */
  onMove = (e) => {
    this.setState({
      oldx: e.detail.x
    })
  }
  /* 滑动结束 */
  onEnd = () => {
    if (this.state.isOk || this.state.oldx < 1) {
      return;
    }

    this.setState({
      count: this.state.count + 1
    }, () => {
      this.setState({
        x: this.state.oldx
      }, () => {
        if ((this.state.oldx + 3) > (this.state.size.pathway - this.state.size.track)) {
          this.setState({
            isOk: true
          })
          this.props.result({flag: true, count: this.state.count})
        } else {
          Taro.nextTick(() => {
            setTimeout(() => {
              this.setState({
                x: 0,
                oldx: 0
              })
            }, 100);
          });
          this.props.result({flag: false, count: this.state.count})
        }
      })

    })
  }

  /* 重置 */
  reset() {
    this.setState({
      x: 0,
      oldx: 0,
      count: 0,
      isOk: false
    })
  }

  render() {
    const {oldx, isOk, x} = this.state
    return (
      <View className="pathway on-pathway" onTouchend={this.onEnd}>
        <View className="tips">
          {
            isOk ? (<Text style="color: #FFFFFF;">验证通过</Text>) : (<Text>拖动滑块验证</Text>)
          }
        </View>
        <View className="track" style={'transform:' + 'translateX(' + oldx + 'px)'}></View>
        <MovableArea animation={true}>
          <MovableView class={'on-track' + (isOk ? ' active' : '')}
                       x={x}
                       direction="horizontal"
                       onChange={this.onMove}
                       disabled={isOk}>
          </MovableView>
        </MovableArea>
      </View>

    )
  }
}
