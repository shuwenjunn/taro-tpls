export default interface LoginConfig {
    /**
     * 登陆方式
     * @default 'username'
     */
    loginType?: 'phone' | 'username' | unknown
    /**
     * 是否允许多种登陆方式 true
     */
    multipl: boolean
    /**
     * 服务端和数据层的映射
     */
    api: {
        /**
         * 账号密码登陆
         */
        userNameLogin: {
            /**
             * 账号密码登陆
             * @param username 用户名 
             * @param password 密码
             * @returns promise
             */
            service(username: string, password: string): Promise<any>
            /**
             * 数据key的值
             */
            model?: string
        }
        /**
         * 手机验证码登陆
         */
        phoneCodeLogin: {
            /**
             * 手机号登陆
             * @param phone 手机号 
             * @param code 短信验证码
             * @returns promise
             */
            service(phone: string, code: string): Promise<any>
            /**
             * 数据key的值
             */
            model?: string
        }
    }
}