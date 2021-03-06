import { changeRequestRepository } from './db/change-request-repository'
import { BankAccountAccountChangeRequestResponse } from './types'
import { getLogger } from './utils/logger'

const handleSuccessfulRequest = async (
  data: BankAccountAccountChangeRequestResponse & { token: string },
): Promise<BankAccountAccountChangeRequestResponse> => {
  const logger = getLogger()
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
