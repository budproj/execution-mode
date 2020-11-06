import { atom } from 'recoil'

export const KEY = 'ATOMS::PAGE::TITLE'

export default atom({
  key: KEY,
  default: '',
})
