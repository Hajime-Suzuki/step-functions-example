import { BankAccountChangeRequest } from './domain/BankAccountChangeRequest'

export type Maybe<A> = A | null | undefined

export type BankAccountChangeId = Pick<BankAccountChangeRequest, 'userId' | 'requestId'>
