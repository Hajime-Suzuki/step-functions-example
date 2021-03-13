import { NotFoundError } from '../errors/NotFoundError'
import { changeRequestRepository } from '../resources/db/change-request-repository'
import { bankAccountRepository } from '../resources/db/bank-account-repository'
import { BankAccountChangeId } from '../types'
import { logger } from '../utils/logger'

const handleFailedRequest = async (data: BankAccountChangeId) => {
  logger.log('input', data)

  const bankAccount = await bankAccountRepository.getById(data.userId)
  if (!bankAccount) throw new NotFoundError('bank account not found')

  await changeRequestRepository.updateState({
    userId: data.userId,
    requestId: data.requestId,
    status: 'FAILURE',
  })

  await sendEmail(bankAccount)

  return { done: true }
}

const sendEmail = async (data: { userId: string; email: string }) => {
  //mock
  logger.log(`sending email to user ${data.userId}...`)

  logger.log('email has been sent')
}

export const handler = handleFailedRequest
