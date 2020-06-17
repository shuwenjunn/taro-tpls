import API from "@/api/request"

export function login(data) {
  return API.request({
    url: '/login',
    data
  })
}

export function regist(data) {
  return API.request({
    url: '/regist',
    data
  })
}
