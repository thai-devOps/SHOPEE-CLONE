import { createHash } from 'crypto'
const sha256 = (content: string) => createHash('sha256').update(content).digest('hex')
const hashPassword = (password: string) => sha256(password + process.env.PASSWORD_SECRET)
export default hashPassword
