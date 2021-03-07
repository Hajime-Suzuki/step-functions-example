import { User } from '../../domain/User'
import { Maybe } from '../../types'
import { client } from './client'
import { tableName } from './config'

export const mkSortKey = () => ({ SK: 'USER' })
const getById = async (userId: string): Promise<Maybe<User>> => {
  const res = await client
    .get({
      TableName: tableName,
      Key: {
        userId,
        ...mkSortKey(),
      },
    })
    .promise()

  return res.Item as Maybe<User>
}

const updateBankAccount = async (data: { userId: string; iban: string; name: string }) => {
  await client
    .update({
      TableName: tableName,
      Key: {
        userId: data.userId,
        ...mkSortKey(),
      },
      UpdateExpression: 'set #iban = :iban, #name = :name',
      ExpressionAttributeNames: {
        '#iban': 'iban',
        '#name': 'name',
      },
      ExpressionAttributeValues: {
        ':iban': data.iban,
        ':name': data.name,
      },
    })
    .promise()
}

export const userRepository = {
  getById,
  updateBankAccount,
}
