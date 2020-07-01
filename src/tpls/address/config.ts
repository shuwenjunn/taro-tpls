import API from "@/api/request"
import AddressConfig from './types/address'
import AddAddressConfig from './types/addAddress'

type Iconfig = {
  address: AddressConfig
  modifyAddress: AddAddressConfig
}

// eslint-disable-next-line import/prefer-default-export
export const config: Iconfig = {
  address: {
    api: {
      getAddress: {
        service: function () {
          return API.request({
            api: 'customer.myself.address.all',
            data: {},
            server: 'integral'
          })
        },
        model: 'addressList'
      }
    }
  },
  modifyAddress: {
    api: {
      addAddress: {
        service: function (data) {
          return API.request({
            api: 'customer.myself.address.add',
            data: {...data},
            server: 'integral'
          })
        },
      },
      updateAddress: {
        service: function (data) {
          return API.request({
            api: 'customer.myself.address.all',
            data: {...data},
            server: 'integral'
          })
        },
      }
    }
  },
}

