import { atom } from 'recoil'

export const KEY = 'ATOMS::USER::ID'

export default atom({
  key: KEY,
  default: '1',
})
