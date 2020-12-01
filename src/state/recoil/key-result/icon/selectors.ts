import { selectorFamily } from 'recoil'

import { KeyResult } from 'src/components/KeyResult'

import { PREFIX, COLORS_AVAILABLE, DRAWINGS_AVAILABLE } from './constants'
import { KeyResultIconDrawing } from './types'

const KEY = `${PREFIX}::SELECTORS`

type KeyResultIconColor = string

export interface KeyResultIcon {
  drawing: KeyResultIconColor
  color: string
}

const selectFromArrayBasedOnString = (array: any[], string?: string) => {
  if (!string) return array[0]

  const stringParts = string.split('') ?? []
  const stringCodeParts = stringParts.map((char) => char.charCodeAt(0))
  const stringCode = stringCodeParts.reduce((previous, next) => previous + next, 0) % array.length

  return array[stringCode]
}

export const getIconColorBasedOnTitle = (title?: KeyResult['title']) => (): KeyResultIconColor =>
  selectFromArrayBasedOnString(COLORS_AVAILABLE, title)

export const selectKeyResultIconColorBasedOnTitle = selectorFamily<
  string,
  KeyResult['title'] | undefined
>({
  key: `${KEY}::COLOR::BASED_ON_TITLE`,
  get: getIconColorBasedOnTitle,
})

export const getIconDrawingBasedOnTitle = (
  title?: KeyResult['title'],
) => (): KeyResultIconDrawing => selectFromArrayBasedOnString(DRAWINGS_AVAILABLE, title)

export const selectKeyResultIconDrawingBasedOnTitle = selectorFamily<
  KeyResultIconDrawing,
  KeyResult['title'] | undefined
>({
  key: `${KEY}::DRAWING::BASED_ON_TITLE`,
  get: getIconDrawingBasedOnTitle,
})
