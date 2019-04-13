import * as http from './http'

export function getCommodity() {
  const url = '/api/commodity'

  return http.get(url)
}
