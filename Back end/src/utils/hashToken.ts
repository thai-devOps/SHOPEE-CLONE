import { createHash } from 'crypto'
const hashToken = (token: string) => {
  const hash = createHash('sha256')
  hash.update(token)
  return hash.digest('hex')
}
export default hashToken
