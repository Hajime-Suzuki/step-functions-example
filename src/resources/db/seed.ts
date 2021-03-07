import { client } from './client'
import { tableName } from './config'
import { mkSortKey } from './user-repository'

export const seed = () => {
  return client
    .batchWrite({
      RequestItems: {
        [tableName]: [
          {
            PutRequest: {
              Item: {
                userId: '1',
                ...mkSortKey(),
                iban: 'NL01ABCD0123456789',
                name: 'John Doe',
                email: 'user1@test.com',
                createdAt: new Date().toISOString(),
              },
            },
          },
          {
            PutRequest: {
              Item: {
                userId: '2',
                ...mkSortKey(),
                iban: 'NL02WXYZ9876543210',
                name: 'Jane Doe',
                email: 'user2@test.com',
                createdAt: new Date().toISOString(),
              },
            },
          },
        ],
      },
    })
    .promise()
}
