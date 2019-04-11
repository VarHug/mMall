import * as http from './http'

export function getAdvertising() {
  const url = '/api/advertising'

  return http.get(url)
}

export function getRecommend() {
  const url = '/api/recommend'

  return http.get(url)
}
