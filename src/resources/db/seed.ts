import { client } from './client'
import { mkSortKey, tableName } from './config'

export const seed = () => {
  return client
    .batchWrite({
      RequestItems: {
        [tableName]: [
          {
            PutRequest: {
              Item: {
                userId: '1',
                ...mkSortKey('USER'),

                iban: 'NL01ABCD0123456789',
                name: 'John Doe',
                email: 'user1@test.com',
              },
            },
          },
          {
            PutRequest: {
              Item: {
                userId: '2',
                ...mkSortKey('USER'),
                iban: 'NL02WXYZ9876543210',
                name: 'Jane Doe',
                email: 'user2@test.com',
              },
            },
          },
        ],
      },
    })
    .promise()
}
