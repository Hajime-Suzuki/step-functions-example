import { APIGatewayEvent } from 'aws-lambda'
import { bankAccountChangeRequest } from '../domain/BankAccountChangeRequest'
import { BadRequestError } from '../errors/BadRequestError'
import { NotFoundError } from '../errors/NotFoundError'
import { changeRequestRepository } from '../resources/db/change-request-repository'
import {
  approveBankAccountChange,
  rejectBankAccountChange,
} from '../resources/step-functions/confirm'
import { logger } from '../utils/logger'

const approveChange = async (event: APIGatewayEvent) => {
  try {
    logger.log('body:', event.body)
    //TODO: add validation
    const data = event.pathParameters as { userId: string; requestId: string }
    const body = event.body
      ? (JSON.parse(event.body) as { type: 'APPROVE' | 'REJECT'; reason?: string })
      : null
    if (!body) throw new BadRequestError('body is empty')

    const changeRequest = await changeRequestRepository.getOne(data)
    if (!changeRequest) throw new NotFoundError('change request not found')

    if (bankAccountChangeRequest.isDone(changeRequest)) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'already validated' }),
      }
    }

    if (body.type === 'APPROVE') {
      logger.log('approve change request')
      await approveBankAccountChange(changeRequest)
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'request is approved' }),
      }
    }

    if (!body.reason) throw new BadRequestError('reason is empty')
    await rejectBankAccountChange(changeRequest, body.reason)
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'request is rejected' }),
    }
  } catch (error) {
    return {
      statusCode: error.status || 500,
      body: JSON.stringify({
        error: error.message,
      }),
    }
  }
}

export const handler = approveChange
