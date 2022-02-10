import { ImageProps, ComponentWithAs } from '@chakra-ui/react'
import { ReactNode } from 'react'

export interface ConfirmationDialogProperties {
  isOpen: boolean
  headerImageURL?: string
  HeaderImageWrapper?: ComponentWithAs<'img', ImageProps>
  title?: string
  description?: string
  confirmationLabel?: string
  descriptionComponent?: ReactNode
  onConfirm: () => void
  onClose: () => void
}
