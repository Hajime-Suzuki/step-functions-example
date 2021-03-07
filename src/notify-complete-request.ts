import { logger } from './utils/logger'

const notifyCompleteRequest = async (data: { userId: string }) => {
  logger.log('input:', data)

  await sendEmail(data.userId)

  return {
    success: true,
  }
}

const sendEmail = async (userId: string) => {
  //mock
  logger.log(`sending email to ${userId}...`)

  logger.log('email has been sent')
}

export const handler = notifyCompleteRequest
