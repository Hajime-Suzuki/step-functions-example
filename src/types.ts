export type Maybe<A> = A | null | undefined

export type User = {
  userId: string
  iban: string
  name: string
}

export type BankAccountChangeRequestInput = {
  userId: string
  name: string
  iban: string
}
