import { genSaltSync, hashSync, compareSync } from 'bcrypt-ts'

export function hashPassword(password: string): string {
  const saltRounds = Number(process.env.SALTROUNDS) || 10

  const salt = genSaltSync(saltRounds)
  return hashSync(password, salt)
}

export function comparePassword(password: string, hashedPassword: string): boolean {
  return compareSync(password, hashedPassword)
}
