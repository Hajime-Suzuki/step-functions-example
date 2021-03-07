const getLogger = () => {
  return {
    log: console.log,
  }
}

export const logger = getLogger()
