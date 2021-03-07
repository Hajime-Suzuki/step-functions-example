import Dynamo from 'aws-sdk/clients/dynamodb'

export const client = new Dynamo.DocumentClient({
  region: process.env.region || 'eu-central-1',
})
