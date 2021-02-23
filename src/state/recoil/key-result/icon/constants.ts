import { PREFIX as PARENT_PREFIX } from '../constants'

import { KeyResultIconDrawing } from './types'

export const PREFIX = `${PARENT_PREFIX}::ICON`

export const COLORS_AVAILABLE = ['brand.500', 'pink.400', 'blue.400', 'purple.500', 'red.500']

export const DRAWINGS_AVAILABLE: KeyResultIconDrawing[] = [
  'Activity',
  'Bookmark',
  'Calendar',
  'TrashBin',
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
]
