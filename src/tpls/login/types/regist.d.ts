export default interface RegistConfig {
  api: {
    /**
     * 账号密码登陆
     */
    customerAccountRegister: {
      /**
       * 账号密码登陆
       * @param phone 手机号
       * @param code 短信验证码
       * @param password 密码
       * @returns promise
       */
      service(phone: string, code: string, password: string): Promise<any>
      /**
       * 数据key的值
       */
      model?: string
    }
  }
}
