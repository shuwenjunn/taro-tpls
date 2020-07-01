export default interface UserinfoConfig {
  avatarKey?: string
  usernameKey: string
  genderKey: string
  sexArray: string[]
  genderMap: {
    [propName: string]: string
  }
  list: Array<Array<{
    key: string
    desc: string
    placeholder?: string
    envnt?: () => void
  }>>
  api: {
    updateUserInfo: {
      service(data: { [propName: string]: string }): Promise<any>
      model?: string
    }
  }
}
