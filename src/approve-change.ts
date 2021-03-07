import { APIGatewayEvent } from 'aws-lambda'
import { bankAccountChangeRequest } from './domain/BankAccountChangeRequest'
import { NotFoundError } from './errors/NotFoundError'
import { changeRequestRepository } from './resources/db/change-request-repository'
import { approveBankAccountChange } from './resources/step-functions/confirm'
import { logger } from './utils/logger'

const approveChange = async (event: APIGatewayEvent) => {
  logger.log('body:', event.body)

  //TODO: add validation
  const data = event.pathParameters as { userId: string; requestId: string }

  const changeRequest = await changeRequestRepository.getOne(data)
  if (!changeRequest) throw new NotFoundError('change request not found')

  if (bankAccountChangeRequest.isDone(changeRequest)) {
    return {
      statusCode: 200,
      body: {
        message: 'already validated',
      },
    }
  }
  logger.log('approve change request')
  await approveBankAccountChange(changeRequest)

  return {
    statusCode: 200,
    body: {
      message: 'request is approved',
    },
  }
}

export const handler = approveChange