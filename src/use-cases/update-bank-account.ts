import { NotFoundError } from '../errors/NotFoundError'
import { changeRequestRepository } from '../resources/db/change-request-repository'
import { bankAccountRepository } from '../resources/db/bank-account-repository'
import { BankAccountChangeId } from '../types'
import { logger } from '../utils/logger'

const updateBankAccount = async (data: BankAccountChangeId) => {
  logger.log('input:', data)

  const changeRequest = await changeRequestRepository.getOne(data)
  if (!changeRequest) throw new NotFoundError('change request not found')

  await changeRequestRepository.completeRequest({
    userId: data.userId,
    requestId: data.requestId,
  })

  await bankAccountRepository.updateBankAccount({
    userId: data.userId,
    iban: changeRequest.iban,
    name: changeRequest.name,
  })

  return {
    userId: data.userId,
  }
}

export const handler = updateBankAccount
