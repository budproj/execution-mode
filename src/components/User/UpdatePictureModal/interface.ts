export interface UserUpdatePictureModalInterface {
  userID?: string
  src?: string
  initialZoom?: number
  isOpen?: boolean
  onClose?: (newValue: boolean) => void
  onUpdate?: () => Promise<void>
}
