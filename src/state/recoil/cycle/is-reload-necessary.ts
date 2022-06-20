import { atom } from 'recoil'

export const isReloadNecessary = atom({
  key: 'isReloadNecessaryForCycles',
  default: false,
})
