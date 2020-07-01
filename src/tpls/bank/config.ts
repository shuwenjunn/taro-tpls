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
    api: {
      getCardList: {
        service: function () {
          return API.request({
            api: 'customer.myself.bankcard.all',
            data: {},
            server: 'integral'
          })
        },
        model: 'cardList'
      },
      removeCard: {
        service: function (data:any) {
          return API.request({
            api: 'customer.myself.bankcard.remove',
            data: data,
            server: 'integral'
          })
        },
      }
    }
  },
  addBank: {
    api: {
      addBank: {
        service: (data) => {
          return API.request({
            api: 'customer.myself.bankcard.add',
            data: {
              ...data
            },
            server: 'integral'
          })
        }
      }
    }
  }
}

