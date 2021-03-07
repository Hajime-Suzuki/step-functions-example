import { BankAccountChangeRequest } from './domain/BankAccountChangeRequest'

export type Maybe<A> = A | null | undefined

export type BankAccountAccountChangeId = Pick<BankAccountChangeRequest, 'userId' | 'requestId'>
