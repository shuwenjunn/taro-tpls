export default interface BankConfig {
    /**
     * 银行名称
     */
    cardNameKey: string
    /**
     * 银行卡类型
     */
    cardTypeKey: string
    /**
     * 银行卡号
     */
    cardNumberKey: string
    /**
     * 银行卡logo
     */
    cardLogoKey: string
    /**
     * 卡片背景
     */
    cardBgKey: string
    api: {
        getCardList: {
            service: () => Promise<any>
            model?: string
        }
    }
}
