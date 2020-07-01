export default interface AddBankConfig {
  api: {
    /**
     * 添加银行
     */
    addBank: {
      /**
       * @param cardNumber 卡号
       * @param username 银行卡持有人
       * @param idcard 身份证号码
       * @param phone 银行卡预留手机号
       * @param code 短信验证码
       */
      service: (data: any) => Promise<any>
      model?: string
    }
  }
}
