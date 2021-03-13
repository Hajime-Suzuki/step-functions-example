import { changeRequestRepository } from '../resources/db/change-request-repository'
import { BankAccountChangeId } from '../types'
import { logger } from '../utils/logger'

const handleSuccessfulRequest = async (
  data: BankAccountChangeId & { token: string },
): Promise<BankAccountChangeId> => {
  logger.log('input', data)

  await changeRequestRepository.updateState({
    userId: data.userId,
    requestId: data.requestId,
    status: 'VALIDATION_SUCCESS',
  })

  await changeRequestRepository.saveToken({
    userId: data.userId,
    requestId: data.requestId,
    token: data.token,
  })

  return {
    userId: data.userId,
    requestId: data.requestId,
  }
}

export const handler = handleSuccessfulRequest
