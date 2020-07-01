
interface AddressIt {
  id: number
  contacts: string
  gender: string
  phone: string
  city: string
  address: string
  is_default: boolean
}
export default interface BankConfig {
    api: {
        getAddress: {
            service: () => Promise<any>
            model?: string
        }
    }
}
