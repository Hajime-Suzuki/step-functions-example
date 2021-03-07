import shortId from 'shortid'

export type BankAccountChangeRequestInput = {
  userId: string
  name: string
  iban: string
}

export type BankAccountChangeStatus =
  | 'WAITING_FOR_VALIDATION'
  | 'VALIDATION_SUCCESS'
  | 'VALIDATION_FAILED'
  | 'SUCCESS'
  | 'FAILURE'

export type BankAccountChangeRequest = {
  userId: string
  name: string
  iban: string
  status: BankAccountChangeStatus
  requestId: string
  token?: string
  createdAt: string
  updatedAt?: string
}

export const mkBankAccountChangeRequest = (
  data: BankAccountChangeRequestInput,
): BankAccountChangeRequest => {
  return {
    userId: data.userId,
    iban: data.iban,
    name: data.name,
    status: 'WAITING_FOR_VALIDATION',
    requestId: shortId(),
    createdAt: new Date().toISOString(),
  }
}

const isWaiting = (data: BankAccountChangeRequest) => data.status === 'WAITING_FOR_VALIDATION'

const isValidated = (data: BankAccountChangeRequest) =>
  data.status === 'VALIDATION_SUCCESS' || data.status === 'VALIDATION_FAILED'

const isDone = (data: BankAccountChangeRequest) =>
  data.status === 'SUCCESS' || data.status === 'FAILURE'

export const bankAccountChangeRequest = {
  isWaiting,
  isValidated,
  isDone,
}
