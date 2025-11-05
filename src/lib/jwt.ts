import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

// JWT with 
const privateKey = fs.readFileSync(path.join(process.cwd(), 'src/lib/keys/private.key'), 'utf8')
const publicKey = fs.readFileSync(path.join(process.cwd(), 'src/lib/keys/public.key'), 'utf8')

export function signToken(payload: object) {
  return jwt.sign(payload, privateKey, {
    algorithm: 'ES256',
    expiresIn: '24h',
  })
}

export function verifyToken(token: string) {
  return jwt.verify(token, publicKey, {
    algorithms: ['ES256'],
  })
}
