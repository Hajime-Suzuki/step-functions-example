import { changeRequestRepository } from './resources/db/change-request-repository'
import { InvalidBankAccountError } from './errors/InvalidBankAccountError'
import { NotFoundError } from './errors/NotFoundError'
import { BankAccountAccountChangeRequestResponse, Maybe } from './types'
import { logger } from './utils/logger'
import { bankAccountChangeRequest } from './domain/BankAccountChangeRequest'

/**
 * this function handles handles any validation of the bank account, such as charging 1 cent
 */
const validateBankAccount = async (
  data: BankAccountAccountChangeRequestResponse,
): Promise<BankAccountAccountChangeRequestResponse> => {
  logger.log('input', data)

  const changeRequest = await changeRequestRepository.getOne(data)
  if (!changeRequest) throw new NotFoundError('change request not found')

  if (!bankAccountChangeRequest.isWaiting(changeRequest)) {
    logger.log('request is already validated')
    return {
      userId: data.userId,
      requestId: data.requestId,
    }
  }

  //TODO: put followings into a different function so that failure on saving request status does not trigger retry (=  more than once)

  const validationError = await validate(changeRequest)

  if (validationError) {
    logger.log(`validation ${data.requestId} for user ${data.userId} failed`)

    await changeRequestRepository.updateState({
      userId: data.userId,
      requestId: data.requestId,
      status: 'VALIDATION_FAILED',
    })

    logger.log(`validation status ${data.requestId} for user ${data.userId} updated`)

    throw new InvalidBankAccountError(validationError)
  }

  return {
    userId: data.userId,
    requestId: data.requestId,
  }
}

const validate = async (_data: { iban: string; name: string }): Promise<Maybe<string>> => {
  //* perform validation such as charge 1 cents. For the simplicity, this is a random success/failure
  // return Math.random() < 0.5 ? null : 'invalid bank account...

  // return 'invalid bank account'
  return null
}

export const handler = validateBankAccount
