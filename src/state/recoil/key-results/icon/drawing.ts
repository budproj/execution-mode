import { atomFamily, selectorFamily } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::DRAWING`

type KeyResultIconDrawingParameter = string

type SelectKeyResultIconDrawingBasedOnTitleParameter = string

type KeyResultIconDrawing = 'PieChart'

export interface KeyResultIcon {
  drawing: KeyResultIconDrawing
  color: string
}

export const selectKeyResultIconDrawingBasedOnTitle = selectorFamily<
  string,
  SelectKeyResultIconDrawingBasedOnTitleParameter
>({
  key: `${KEY}::BASED_ON_TITLE`,
  get: (title) => (): KeyResultIconDrawing => {
    console.log(title)

    return 'PieChart'
  },
})

export const keyResultIconDrawing = atomFamily<string, KeyResultIconDrawingParameter>({
  key: KEY,
  default: selectKeyResultIconDrawingBasedOnTitle,
})
