export default interface AboutConfig {
    logo: string
    appName: string
    version: string
    list: Array<{
      desc: string
      targetPath: string
    }>
}
