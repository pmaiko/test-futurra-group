import { createHash } from 'crypto'

export const generateHash = (data: string) => {
  return createHash('sha256').update(data).digest('hex')
}
