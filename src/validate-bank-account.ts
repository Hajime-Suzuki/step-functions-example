import { changeRequestRepository } from './db/change-request-repository'
import { BankAccountAccountChangeRequestResponse } from './types'

/**
 * this function handles handles any validation of the bank account, such as charging 1 cent
 */
const validateBankAccount = async (
  data: BankAccountAccountChangeRequestResponse,
): Promise<BankAccountAccountChangeRequestResponse> => {
  //* perform some validations

  //TODO: add error response

  await changeRequestRepository.updateState({
    userId: data.userId,
    requestId: data.requestId,
    status: 'VALIDATION_SUCCESS',
  })

  return {
    userId: data.userId,
    requestId: data.requestId,
  }
}

export const handler = validateBankAccount
