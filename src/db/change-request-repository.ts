import shortId from 'shortid'
import { BankAccountChangeRequestInput } from '../types'
import { client } from './client'
import { mkSortKey, tableName } from './config'

const save = async (data: BankAccountChangeRequestInput) => {
  const requestId = shortId()

  await client
    .put({
      TableName: tableName,
      Item: {
        ...data,
        ...mkSortKey(shortId()),
      },
    })
    .promise()

  return { requestId }
}

export const changeRequestRepository = {
  save,
}
