export function testPhone(phone: string): boolean {
  const phoneReg = /^(?:(?:\+|00)86)?1\d{10}$/
  return phoneReg.test(phone)
}


export function text() {

}
