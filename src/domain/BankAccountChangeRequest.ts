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

export type BankAccountChangeRequest = {
  userId: string
  name: string
  iban: string
  status: BankAccountChangeStatus
  requestId: string
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
  }
}
