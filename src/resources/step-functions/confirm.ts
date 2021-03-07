import { BankAccountChangeRequest } from '../../domain/BankAccountChangeRequest'
import { NotFoundError } from '../../errors/NotFoundError'
import { stepFunctions } from './client'

export const approveBankAccountChange = async (data: BankAccountChangeRequest) => {
  if (!data.token) throw new NotFoundError('token is missing')
  await stepFunctions
    .sendTaskSuccess({
      taskToken: data.token,
      output: JSON.stringify({
        userId: data.userId,
        requestId: data.requestId,
        message: 'bank account change is approved',
      }),
    })
    .promise()
}

export const rejectBankAccountChange = async (data: BankAccountChangeRequest, reason: string) => {
  if (!data.token) throw new NotFoundError('token is missing')
  await stepFunctions
    .sendTaskFailure({
      taskToken: data.token,
      error: 'BANK_ACCOUNT_CHANGE_REJECTED',
      cause: reason,
    })
    .promise()
}
