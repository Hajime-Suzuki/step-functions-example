import {
  BankAccountChangeRequest,
  BankAccountChangeStatus,
} from '../domain/BankAccountChangeRequest'
import { Maybe } from '../types'
import { logger } from '../utils/logger'
import { client } from './client'
import { mkSortKey, tableName } from './config'

// sort key is requestId
type DBRecord = Omit<BankAccountChangeRequest, 'requestId'> & { SK: string }
const parseDBRecord = ({ SK, ...data }: DBRecord): BankAccountChangeRequest => ({
  ...data,
  requestId: SK,
})

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

const getOne = async (
  data: Pick<BankAccountChangeRequest, 'userId' | 'requestId'>,
): Promise<Maybe<BankAccountChangeRequest>> => {
  logger.log('getting request for', data)

  const res = await client
    .get({
      TableName: tableName,
      Key: {
        userId: data.userId,
        ...mkSortKey(data.requestId),
      },
    })
    .promise()

  logger.log('request found: ', res.Item)

  return res.Item ? parseDBRecord(res.Item as DBRecord) : null
}

const updateState = async (data: {
  userId: string
  requestId: string
  status: Exclude<BankAccountChangeStatus, 'WAITING_FOR_VALIDATION'>
}) => {
  logger.log('update status:', data)
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

const saveToken = async (data: { userId: string; requestId: string; token: string }) => {
  return await client
    .update({
      TableName: tableName,
      Key: {
        userId: data.userId,
        ...mkSortKey(data.requestId),
      },
      UpdateExpression: 'set #token = :token',
      ExpressionAttributeNames: {
        '#token': 'token',
      },
      ExpressionAttributeValues: {
        ':token': data.token,
      },
    })
    .promise()
}

export const changeRequestRepository = {
  save,
  getOne,
  saveToken,
  updateState,
}
