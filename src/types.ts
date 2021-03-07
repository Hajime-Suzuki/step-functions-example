import { BankAccountChangeRequest } from './domain/BankAccountChangeRequest'

export type Maybe<A> = A | null | undefined

export type BankAccountAccountChangeRequestResponse = Pick<
  BankAccountChangeRequest,
  'userId' | 'requestId'
>
