import { atomFamily, selectorFamily } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::COLOR`

type KeyResultIconColorParameter = string

type SelectKeyResultIconColorBasedOnTitleParameter = string

type KeyResultIconColor = string

export interface KeyResultIcon {
  drawing: KeyResultIconColor
  color: string
}

export const selectKeyResultIconColorBasedOnTitle = selectorFamily<
  string,
  SelectKeyResultIconColorBasedOnTitleParameter
>({
  key: `${KEY}::BASED_ON_TITLE`,
  get: (title) => (): KeyResultIconColor => {
    console.log(title)

    return '#6F6EFF'
  },
})

export const keyResultIconColor = atomFamily<string, KeyResultIconColorParameter>({
  key: KEY,
  default: selectKeyResultIconColorBasedOnTitle,
})
