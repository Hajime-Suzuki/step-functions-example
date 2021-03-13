import { BankAccount } from '../../domain/User'
import { Maybe } from '../../types'
import { client } from './client'
import { tableName } from './config'

export const mkSortKey = () => ({ SK: 'BANK_ACCOUNT' })
const getById = async (userId: string): Promise<Maybe<BankAccount>> => {
  const res = await client
    .get({
      TableName: tableName,
      Key: {
        userId,
        ...mkSortKey(),
      },
    })
    .promise()

  return res.Item as Maybe<BankAccount>
}

const updateBankAccount = async (data: { userId: string; iban: string; name: string }) => {
  await client
    .update({
      TableName: tableName,
      Key: {
        userId: data.userId,
        ...mkSortKey(),
      },
      UpdateExpression: 'set #iban = :iban, #name = :name, #updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#iban': 'iban',
        '#name': 'name',
        '#updatedAt': 'updatedAt',
      },
      ExpressionAttributeValues: {
        ':iban': data.iban,
        ':name': data.name,
        ':updatedAt': new Date().toISOString(),
      },
    })
    .promise()
}

export const bankAccountRepository = {
  getById,
  updateBankAccount,
}
