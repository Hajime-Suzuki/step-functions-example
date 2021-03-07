import { User } from '../../domain/User'
import { Maybe } from '../../types'
import { client } from './client'
import { tableName } from './config'

const getById = async (userId: string): Promise<Maybe<User>> => {
  const res = await client
    .get({
      TableName: tableName,
      Key: {
        userId,
        SK: 'USER',
      },
    })
    .promise()

  return res.Item as Maybe<User>
}

export const userRepository = {
  getUserById: getById,
}
