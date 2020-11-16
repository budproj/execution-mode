import { atomFamily, selectorFamily } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::DRAWING`

type KeyResultIconDrawingParameter = string

type SelectKeyResultIconDrawingBasedOnTitleParameter = string

type KeyResultIconDrawing = typeof availableDrawings[number]

export interface KeyResultIcon {
  drawing: KeyResultIconDrawing
  color: string
}

const availableDrawings = [
  'Activity',
  'Bookmark',
  'Calendar',
  'Delete',
  'Discovery',
  'Document',
  'EditSquare',
  'Folder',
  'Game',
  'Graph',
  'Heart',
  'Location',
  'Message',
  'Scan',
  'Search',
  'TicketStar',
  'TimesSquare',
  'Video',
  'Voice',
  'Wallet',
] as const

export const selectKeyResultIconDrawingBasedOnTitle = selectorFamily<
  string | undefined,
  SelectKeyResultIconDrawingBasedOnTitleParameter
>({
  key: `${KEY}::BASED_ON_TITLE`,
  get: (title) => (): KeyResultIconDrawing => {
    if (!title) return availableDrawings[0]

    const titleParts = title.split('')
    const titleCodeParts = titleParts.map((char) => char.charCodeAt(0))
    const titleCode =
      titleCodeParts.reduce((previous, next) => previous + next, 0) % availableDrawings.length

    return availableDrawings[titleCode]
  },
})

export const keyResultIconDrawing = atomFamily<string, KeyResultIconDrawingParameter>({
  key: KEY,
  default: selectKeyResultIconDrawingBasedOnTitle,
})
