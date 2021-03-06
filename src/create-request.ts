import { changeRequestRepository } from './db/change-request-repository'
import { userRepository } from './db/user-repository'
import {
  BankAccountChangeRequestInput,
  mkBankAccountChangeRequest,
} from './domain/BankAccountChangeRequest'
import { NotFoundError } from './errors/NotFoundError'
import { BankAccountAccountChangeRequestResponse } from './types'

const createRequest = async (
  data: BankAccountChangeRequestInput,
): Promise<BankAccountAccountChangeRequestResponse> => {
  //TODO: add input validation
  console.log(`input: ${data}`)

  const user = await userRepository.getUserById(data.userId)
  if (!user) throw new NotFoundError('user not found')

  const changeRequest = mkBankAccountChangeRequest(data)
  await changeRequestRepository.save(changeRequest)

  console.log(`request is created: userId ${data.userId}, requestId: ${changeRequest.requestId}`)

  return {
    userId: data.userId,
    requestId: changeRequest.requestId,
  }
}

export const handler = createRequest
