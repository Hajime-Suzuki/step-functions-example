import { BankAccountChangeRequest } from './domain/BankAccountChangeRequest'

export type Maybe<A> = A | null | undefined

export type User = {
  userId: string
  iban: string
  name: string
}

export type BankAccountAccountChangeRequestResponse = Pick<
  BankAccountChangeRequest,
  'userId' | 'requestId'
>
