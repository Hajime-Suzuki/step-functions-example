import {
  BankAccountChangeRequestInput,
  mkBankAccountChangeRequest,
} from '../domain/BankAccountChangeRequest'
import { NotFoundError } from '../errors/NotFoundError'
import { changeRequestRepository } from '../resources/db/change-request-repository'
import { bankAccountRepository } from '../resources/db/bank-account-repository'
import { BankAccountChangeId } from '../types'
import { logger } from '../utils/logger'

const createRequest = async (data: BankAccountChangeRequestInput): Promise<BankAccountChangeId> => {
  //TODO: add input validation
  logger.log('input:', data)

  const bankAccount = await bankAccountRepository.getById(data.userId)
  if (!bankAccount) throw new NotFoundError('bank account not found')

  const changeRequest = mkBankAccountChangeRequest(data)
  await changeRequestRepository.save(changeRequest)

  logger.log(`request is created: userId ${data.userId}, requestId: ${changeRequest.requestId}`)

  return {
    userId: data.userId,
    requestId: changeRequest.requestId,
  }
}

export const handler = createRequest
