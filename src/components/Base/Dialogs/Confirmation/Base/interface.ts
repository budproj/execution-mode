import { ImageProps } from '@chakra-ui/image'
import { ComponentWithAs } from '@chakra-ui/system'
import { ReactNode } from 'react'

export interface ConfirmationDialogProperties {
  isOpen: boolean
  headerImageURL?: string
  HeaderImageWrapper?: ComponentWithAs<'img', ImageProps>
  title?: string
  description?: string
  descriptionComponent?: ReactNode
  onConfirm: () => void
  onClose: () => void
}
