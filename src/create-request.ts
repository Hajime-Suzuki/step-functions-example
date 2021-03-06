import { changeRequestRepository } from './db/change-request-repository'
import { userRepository } from './db/user-repository'
import { NotFoundError } from './errors/NotFoundError'
import { BankAccountChangeRequestInput } from './types'

const createRequest = async (
  data: BankAccountChangeRequestInput,
): Promise<{ requestId: string }> => {
  //TODO: add input validation
  console.log(`input: ${data}`)

  const user = await userRepository.getUserById(data.userId)
  if (!user) throw new NotFoundError('user not found')

  const res = await changeRequestRepository.save(data)

  console.log(`request is created: userId ${data.userId}, requestId: ${res.requestId}`)
  return res
}

export const handler = createRequest
