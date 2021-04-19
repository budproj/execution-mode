import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { UserUpdatePictureModalInterface } from './interface'

export const UserUpdatePictureModal = ({
  src,
  isOpen,
  onClose,
}: UserUpdatePictureModalInterface) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen ?? false)

  const handleClose = () => {
    setIsModalOpen(false)
    if (onClose) onClose(false)
  }

  useEffect(() => {
    setIsModalOpen(Boolean(isOpen))
  }, [isOpen, setIsModalOpen])

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>src</ModalContent>
    </Modal>
  )
}
