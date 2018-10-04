import { stringify } from 'querystring'
import { safeJSONparse } from '~/util/json'

type Option = {
  query?: {},
  method?: 'GET' | 'PUT' | 'POST',
  body?: any,
}

export default (
  url: string,
  { query = {}, method = 'GET', body }: Option = {}
): any =>
  fetch(`${url}?${stringify(query)}`, {
    method: method || 'GET',
    body: (body && JSON.stringify(body)) || undefined,
    headers: {
      'content-type': (body && 'application/json') || 'application/json',
    },
  })
    .then(async res => {
      const text = await res.text()

      if (!res.ok) throw Error(`${res.status} - ${text}`)

      const o = safeJSONparse(text) || text

      return o
    })
    .catch(err => {
      throw err
    })
