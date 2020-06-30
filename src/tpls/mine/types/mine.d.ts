/**
 * 横向卡片
 */
interface BlockConfig {
  /**
   * 卡片标题
   */
  subTitle: string
  /**
   * 一行最大排列的个数
   */
  maxCountInline: 3 | 4 | 5 | 6
  /**
   * item配置
   */
  items: Array<{
    /**
     * 图标路径
     */
    iconPath: any
    /**
     * 描述
     */
    desc: string
    /**
     * 跳转目标路径
     */
    targetPath: string
    /**
     * 跳转参数
     */
    params?: {
      [propNames: string]: string
    }
  }>
}


export default interface MineConfig {
  avatarKey: string
  usernameKey: string
  blocks: Array<BlockConfig>
  list: Array<Array<{
    iconPath: string
    desc: string
    /**
     * 跳转目标路径
     */
    targetPath: string
    /**
     * 跳转参数
     */
    params?: {
      [propNames: string]: string
    }
  }>>
  api: {
    getUserInfo: {
      service(): Promise<any>
      model?: string
    }
    exitLogin: {
      service(): Promise<any>
      model?: string
    }
  }
}
