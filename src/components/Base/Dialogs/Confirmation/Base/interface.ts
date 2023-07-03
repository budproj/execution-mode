import { ImageProps, ComponentWithAs } from '@chakra-ui/react'
import { ReactNode } from 'react'

import { DANGERS_ACTIONS_HEADER_COLORS_SCHEME } from './Sections/header'

export interface ConfirmationDialogProperties {
  isOpen: boolean
  headerImageURL?: string | ReactNode
  HeaderImageWrapper?: ComponentWithAs<'img', ImageProps>
  title?: string | ReactNode
  confirmButtonColorScheme?: string
  headerColorScheme?: DANGERS_ACTIONS_HEADER_COLORS_SCHEME
  description?: string
  confirmationLabel?: string
  descriptionComponent?: ReactNode
  onConfirm: () => void
  onClose: () => void
}
