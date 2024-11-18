import { randomRpcId } from '../common'

export class RPC {
  private uri: string

  constructor(uri: string) {
    this.uri = uri
  }

  post = async <T>(method: string, params: Array<any>) => {
    const body = {
      id: randomRpcId(),
      jsonrpc: '2.0',
      method,
      params,
    }

    return fetch(this.uri, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw new Error(`RPC call "${method}" failed due to error: ${res.error.message}`)
        }
        return res.result as T
      })
  }
}
