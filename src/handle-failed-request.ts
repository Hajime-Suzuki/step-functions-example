import { changeRequestRepository } from './resources/db/change-request-repository'
import { userRepository } from './resources/db/user-repository'
import { NotFoundError } from './errors/NotFoundError'
import { BankAccountAccountChangeRequestResponse } from './types'
import { logger } from './utils/logger'

const handleFailedRequest = async (data: BankAccountAccountChangeRequestResponse) => {
  logger.log('input', data)

  const user = await userRepository.getUserById(data.userId)
  if (!user) throw new NotFoundError('user not found')

  await changeRequestRepository.updateState({
    userId: data.userId,
    requestId: data.requestId,
    status: 'FAILURE',
  })

  await sendEmail(user)

  return { done: true }
}

const sendEmail = async (data: { userId: string; email: string }) => {
  //mock
  logger.log(`sending email to user ${data.userId}...`)

  logger.log('email has been sent')
}

export const handler = handleFailedRequest
