import API from "@/api/request"
import BankConfig from './types/bank'
import AddBankConfig from './types/addBank'

type Iconfig = {
    bank: BankConfig
    addBank: AddBankConfig
}

// eslint-disable-next-line import/prefer-default-export
export const config: Iconfig = {
    bank: {
        cardNameKey: 'cardName',
        cardNumberKey: 'cardNumber',
        cardTypeKey: 'cardType',
        cardBgKey: 'cardBg',
        cardLogoKey: 'cardlogo',
        api: {
            getCardList: {
                service: () => {
                    return API.request({
                        api: 'card.get',
                        data: {}
                    })
                },
                model: 'cardList'
            }
        }
    },
    addBank: {
        api: {
            addBank: {
                service: (cardNumber: string, username: string, idcard: string, phone: string, code: string) => {
                    return API.request({
                        api: 'card.get',
                        data: {
                            cardNumber, username, idcard, phone, code
                        }
                    })
                }
            }
        }
    }
}

