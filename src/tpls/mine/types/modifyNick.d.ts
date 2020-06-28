export default interface ModifyNickConfig {
  api: {
    modifyUserinfo: {
      service: (username: string) => Promise<any>
      model?: string
    }
  }
}
