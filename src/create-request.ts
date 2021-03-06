import { BankAccountChangeRequest } from './types'

const createRequest = (data: BankAccountChangeRequest) => {
  console.log(data)

  return data
}

export const handler = createRequest
