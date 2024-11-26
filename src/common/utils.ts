export const sleep = (ms: number): Promise<void> => {
  const start = Date.now()

  return new Promise((resolve) => {
    const intervalId = setInterval(
      () => {
        const elapsed = Date.now() - start
        if (elapsed > ms) {
          clearInterval(intervalId)
          resolve()
        }
      },
      Math.min(ms, 10),
    )
  })
}

export const randomRpcId = () => {
  return Math.round(Math.random() * 100)
}

export const parsePeerAddr = (addr: string) => {
  const [, , ip, , port, , peerId] = addr.split('/')
  const rpcAddr = `http://${ip}:${+port - 1}` // TODO: fix the port
  return { rpcAddr, peerId }
}
