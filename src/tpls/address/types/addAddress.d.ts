interface AddressIt {
  id: number
  contacts: string
  gender: string
  phone: string
  city: string
  address: string
  is_default: boolean
}

export default interface AddAddressConfig {
  api: {
    addAddress: {
      service: (data) => Promise<any>
      model?: string
    }
    updateAddress: {
      service: (data) => Promise<any>
      model?: string
    }
  }
}
