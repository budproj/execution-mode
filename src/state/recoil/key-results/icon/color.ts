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

const availableColors = [
  '#D65B6F',
  '#DE7325',
  '#E6A228',
  '#F0CC30',
  '#B6DF34',
  '#73D078',
  '#6EC9C0',
  '#7ED1FA',
  '#335AF4',
  '#6F6EFF',
  '#5851F2',
  '#8247DB',
  '#DF79FA',
  '#D9549A',
  '#596C89',
  '#F35166',
  '#B8C5D4',
  '#DDE5EE',
  '#24CB8D',
]

export const selectKeyResultIconColorBasedOnTitle = selectorFamily<
  string | undefined,
  SelectKeyResultIconColorBasedOnTitleParameter
>({
  key: `${KEY}::BASED_ON_TITLE`,
  get: (title) => (): KeyResultIconColor => {
    if (!title) return availableColors[0]

    const titleParts = title.split('') ?? []
    const titleCodeParts = titleParts.map((char) => char.charCodeAt(0))
    const titleCode =
      titleCodeParts.reduce((previous, next) => previous + next, 0) % availableColors.length

    return availableColors[titleCode]
  },
})

export const keyResultIconColor = atomFamily<string, KeyResultIconColorParameter>({
  key: KEY,
  default: selectKeyResultIconColorBasedOnTitle,
})
