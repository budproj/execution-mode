import { selectorFamily } from 'recoil'

import { PREFIX, COLORS_AVAILABLE, DRAWINGS_AVAILABLE } from './constants'

const KEY = `${PREFIX}::SELECTORS`

type SelectKeyResultIconColorBasedOnTitleParameter = string
type SelectKeyResultIconDrawingBasedOnTitleParameter = string
type KeyResultIconColor = string
type KeyResultIconDrawing = typeof DRAWINGS_AVAILABLE[number]

export interface KeyResultIcon {
  drawing: KeyResultIconColor
  color: string
}

const selectFromArrayBasedOnString = (string: string, array: any[]) => {
  if (!string) return array[0]

  const stringParts = string.split('') ?? []
  const stringCodeParts = stringParts.map((char) => char.charCodeAt(0))
  const stringCode = stringCodeParts.reduce((previous, next) => previous + next, 0) % array.length

  return array[stringCode]
}

export const selectKeyResultIconColorBasedOnTitle = selectorFamily<
  string | undefined,
  SelectKeyResultIconColorBasedOnTitleParameter
>({
  key: `${KEY}::COLOR::BASED_ON_TITLE`,
  get: (title) => (): KeyResultIconColor => selectFromArrayBasedOnString(title, COLORS_AVAILABLE),
})

export const selectKeyResultIconDrawingBasedOnTitle = selectorFamily<
  string | undefined,
  SelectKeyResultIconDrawingBasedOnTitleParameter
>({
  key: `${KEY}::DRAWING::BASED_ON_TITLE`,
  get: (title) => (): KeyResultIconDrawing =>
    selectFromArrayBasedOnString(title, DRAWINGS_AVAILABLE),
})
