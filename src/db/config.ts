export const tableName =
  process.env.tableName || 'step-functions-example-dev__BankAccountRequestTable'

export const mkSortKey = (data: string) => ({ SK: data })
