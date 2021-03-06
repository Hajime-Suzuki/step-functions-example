import {
  BankAccountChangeRequest,
  BankAccountChangeStatus,
} from '../domain/BankAccountChangeRequest'
import { client } from './client'
import { mkSortKey, tableName } from './config'

const save = async (data: BankAccountChangeRequest) => {
  await client
    .put({
      TableName: tableName,
      Item: {
        ...data,
        ...mkSortKey(data.requestId),
      },
    })
    .promise()
}

const updateState = async (data: {
  userId: string
  requestId: string
  status: Exclude<BankAccountChangeStatus, 'WAITING_FOR_VALIDATION'>
}) => {
  await client
    .update({
      TableName: tableName,
      Key: {
        userId: data.userId,
        ...mkSortKey(data.requestId),
      },
      UpdateExpression: 'set #status = :status',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':status': data.status,
      },
    })
    .promise()
}

export const changeRequestRepository = {
  save,
  updateState,
}
