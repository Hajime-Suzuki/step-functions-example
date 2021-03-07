import { NotFoundError } from '../errors/NotFoundError'
import { changeRequestRepository } from '../resources/db/change-request-repository'
import { userRepository } from '../resources/db/user-repository'
import { BankAccountAccountChangeId } from '../types'
import { logger } from '../utils/logger'

const updateBankAccount = async (data: BankAccountAccountChangeId) => {
  logger.log('input:', data)

  const changeRequest = await changeRequestRepository.getOne(data)
  if (!changeRequest) throw new NotFoundError('change request not found')

  await changeRequestRepository.completeRequest({
    userId: data.userId,
    requestId: data.requestId,
  })

  await userRepository.updateBankAccount({
    userId: data.userId,
    iban: changeRequest.iban,
    name: changeRequest.name,
  })

  return {
    userId: data.userId,
  }
}

export const handler = updateBankAccount
