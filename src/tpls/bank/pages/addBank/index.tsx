import Taro, { Component, Config } from '@tarojs/taro'
import API from '@/api/request'
import { Button, Form, Input, View, Image } from '@tarojs/components'
import styles from './style.module.less'
import * as service from '../../../../pages/login/service'
import { config } from '../../config'
import { setData } from '../../model'

import checkedImg from '../../assets/images/check.svg'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
    loading: boolean
    phone: string
    countdownTime: number
    isAgree: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


export default class Index extends Component<IProps, PageState> {
    timmer: NodeJS.Timeout

    constructor() {
        super()
        this.state = {
            loading: false,
            phone: '',
            countdownTime: 60,
            isAgree: false
        }
    }

    config: Config = {
        navigationBarTitleText: '添加银行卡'
    }

    componentDidMount() {

    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    //点击提交按钮
    onSubmit = async (e) => {
        const { number, username, idcard, phone, code } = e.detail.value


        if (!number) {
            Taro.showToast({
                title: '请输入银行卡号',
                icon: 'none',
                duration: 2000
            })
            return
        }
        if (!username) {
            Taro.showToast({
                title: '请输入开户人姓名',
                icon: 'none',
                duration: 2000
            })
            return
        }

        if (!idcard) {
            Taro.showToast({
                title: '输入身份证号码',
                icon: 'none',
                duration: 2000
            })
            return
        }
        if (!phone) {
            Taro.showToast({
                title: '请输入银行预留手机号',
                icon: 'none',
                duration: 2000
            })
            return
        }
        if (!code) {
            Taro.showToast({
                title: '请确认验证码',
                icon: 'none',
                duration: 2000
            })
            return
        }

        if (!this.state.isAgree) {
            Taro.showToast({
                title: '请勾选协议',
                icon: 'none',
                duration: 2000
            })
            return

        }


        this.setState({ loading: true })
        setTimeout(() => {
            this.setState({ loading: false })
            Taro.navigateBack()
        }, 2000)
    }

    onInput = (e) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.setState({ [`${e.target.id}`]: e.detail.value })
    }

    onGetCode = () => {
        this.timmer = setInterval(() => {
            const { countdownTime } = this.state
            console.log('countdownTime---------->>', countdownTime)
            if (countdownTime <= 1) {
                clearInterval(this.timmer)
                this.setState({ countdownTime: 60 })
            } else {
                this.setState({ countdownTime: countdownTime - 1 })
            }
        }, 100)
    }

    onCheck = () => {
        this.setState({
            isAgree: !this.state.isAgree
        })
    }

    render() {

        const { phone, countdownTime, isAgree } = this.state
        return (
            <View className={styles.index}>
                <Form className={styles.formWrapper} onSubmit={this.onSubmit.bind(this)}>
                    <View className={styles.formItem}>
                        <Input className={styles.input} name='number' type='number' placeholder='请输入银行卡号' />
                    </View>

                    <View className={styles.formItem}>
                        <Input className={styles.input} name='username' placeholder='请输入开户人姓名' />
                    </View>
                    <View className={styles.formItem}>
                        <Input className={styles.input} name='idcard' type='idcard' placeholder='请输入身份证号' />
                    </View>

                    <View className={styles.formItem}>
                        <Input className={styles.input} name='phone' type='number' id='phone' onInput={this.onInput.bind(this)} placeholder='请输入银行预留手机号' />
                    </View>
                    <View className={styles.formItem}>
                        <Input className={styles.input} name='code' id='code' placeholder='请输入验证码' />
                        {phone && countdownTime === 60 ? (
                            <View className={styles.codeBtn} onClick={this.onGetCode.bind(this)}>获取验证码</View>
                        ) : (
                                <View className={`${styles.codeBtn} ${styles.disabled}`}>
                                    {countdownTime < 60 ? countdownTime : '获取验证码'}
                                </View>
                            )}
                    </View>

                    <View className={styles.radio} onClick={this.onCheck.bind(this)}>
                        <View className={styles.radioIt}>
                            <View className={isAgree ? styles.icon : [`${styles.icon}`, `${styles.uncheck}`].join(' ')}>
                                {isAgree && <Image className={styles.icon} src={checkedImg} />}
                            </View>
                            <View className={styles.desc}>我已阅读并同意签署《某某支付服务协议》</View>
                        </View>
                    </View>
                    {isAgree ? (
                        <Button
                            className={styles.submit}
                            formType='submit'
                            loading={this.state.loading}
                            disabled={this.state.loading}
                            plain
                        >
                            同意协议并绑定
                        </Button>
                    ) : (
                            <Button
                                className={`${styles.submit} ${styles.disabled}`}
                                loading={this.state.loading}
                                disabled={this.state.loading}
                                plain
                            >
                                同意协议并绑定
                            </Button>
                        )}

                </Form>
            </View>
        )
    }
}

