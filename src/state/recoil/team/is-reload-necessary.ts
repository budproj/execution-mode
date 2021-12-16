import { atom } from 'recoil'

export const isReloadNecessary = atom({
  key: 'isReloadNecessaryForTeams',
  default: false,
})
