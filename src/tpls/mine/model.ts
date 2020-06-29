const globalData = {
    userinfo: {
        gender: 'man',
        username: 'shuwenjun'
    }
}

export function setData(key, val) {
    globalData[key] = val
}

export function getData(key) {
    return globalData[key]
}