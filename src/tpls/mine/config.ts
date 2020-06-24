import API from "@/api/request"
import MineConfig from './types/mine'
import AboutConfig from "./types/about";
import UserinfoCofig from './types/userinfo'

type Iconfig = {
    mine: MineConfig
    about: AboutConfig
    userinfo: UserinfoCofig
}

// eslint-disable-next-line import/prefer-default-export
export const config: Iconfig = {
    // 我的页面
    mine: {
        blocks: [{
            subTitle: '我的订单',
            maxCountInline: 5,
            items: [
                {
                    iconPath: 'https://i.loli.net/2020/06/24/uKgMtAUQrB1iIZR.png',
                    desc: '待付款',
                    targetPath: 'https://i.loli.net/2020/06/24/uKgMtAUQrB1iIZR.png',
                    params: {
                        aaa: '1234'
                    }
                },
                {
                    iconPath: 'https://i.loli.net/2020/06/24/uKgMtAUQrB1iIZR.png',
                    desc: '待发货',
                    targetPath: 'https://i.loli.net/2020/06/24/uKgMtAUQrB1iIZR.png',
                    params: {
                        aaa: '1234'
                    }
                },
                {
                    iconPath: 'https://i.loli.net/2020/06/24/uKgMtAUQrB1iIZR.png',
                    desc: '待收货',
                    targetPath: 'https://i.loli.net/2020/06/24/uKgMtAUQrB1iIZR.png',
                    params: {
                        aaa: '1234'
                    }
                },
                {
                    iconPath: 'https://i.loli.net/2020/06/24/uKgMtAUQrB1iIZR.png',
                    desc: '已完成',
                    targetPath: 'https://i.loli.net/2020/06/24/uKgMtAUQrB1iIZR.png',
                    params: {
                        aaa: '1234'
                    }
                },
            ]
        }],
        list: [
            [
                {
                    iconPath: 'https://i.loli.net/2020/06/24/H6G8EC5glDJT2IY.png',
                    desc: '修改密码',
                    targetPath: '',
                },
                {
                    iconPath: 'https://i.loli.net/2020/06/24/H6G8EC5glDJT2IY.png',
                    desc: '联系客服',
                    targetPath: '',
                },
                {
                    iconPath: 'https://i.loli.net/2020/06/24/H6G8EC5glDJT2IY.png',
                    desc: '常见问题',
                    targetPath: '',
                },
                {
                    iconPath: 'https://i.loli.net/2020/06/24/H6G8EC5glDJT2IY.png',
                    desc: '关于我们',
                    targetPath: '',
                },
            ]
        ]
    },

    // 关于
    about: {
        appName: 'APP名称',
        version: 'v.1.0.1',
        logo: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
        list: [
            {
                desc: '使用帮助',
                targetPath: 'fasfda'
            },
            {
                desc: '隐私政策',
                targetPath: 'fasfda'
            },
        ]
    },
    userinfo: {
        avatarKey: 'avatar',
        list: [
            [
                {
                    key: 'name',
                    desc: '安宝宝',
                    placeholder:'未设置1',
                },
                {
                    key: 'address',
                    desc: '地址管理',
                    placeholder:'未设置'
                },
            ],
        ]
    }

}

