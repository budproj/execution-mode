import { Menu, MenuButton, MenuList, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import { ConfirmationModal } from 'src/components/Base'
import TreeDotsIcon from 'src/components/Icon/TreeDots'

import messages from './messages'

export interface KeyResultSectionTimelineCardBaseOptionsProperties {
  intlCardType?: string
  onDelete?: () => void
}

const KeyResultSectionTimelineCardBaseOptions = ({
  onDelete,
  intlCardType,
}: KeyResultSectionTimelineCardBaseOptionsProperties) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false)
  const intl = useIntl()

  const handleMenuOpen = () => {
    setIsMenuOpen(true)
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  const handleOpenDeleteConfirmationModal = () => {
    setIsDeleteConfirmationModalOpen(true)
    handleMenuClose()
  }

  const handleCloseDeleteConfirmationModal = () => {
    setIsDeleteConfirmationModalOpen(false)
  }

  const handleDelete = () => {
    if (onDelete) onDelete()
    handleCloseDeleteConfirmationModal()
  }

  return (
    <>
      <Menu isOpen={isMenuOpen} onOpen={handleMenuOpen} onClose={handleMenuClose}>
        <MenuButton>
          <TreeDotsIcon
            desc={intl.formatMessage(messages.treeDotsIconDesc)}
            fill="gray.300"
            w={4}
            h="auto"
          />
        </MenuButton>
        <MenuList>
          <Button
            color="gray.400"
            p={2}
            w="100%"
            justifyContent="flex-start"
            variant="none"
            _hover={{ bg: 'black.100' }}
            onClick={handleOpenDeleteConfirmationModal}
          >
            {intl.formatMessage(messages.removeMenuOption)}
          </Button>
        </MenuList>
      </Menu>

      <ConfirmationModal
        isOpen={isDeleteConfirmationModalOpen}
        titleText={intl.formatMessage(messages.deleteModalTitle, {
          type: intlCardType
            ? intlCardType.toLowerCase()
            : intl.formatMessage(messages.cardTypeFallback).toLowerCase(),
        })}
        confirmationButtonText={intl.formatMessage(messages.removeMenuOption)}
        onClose={handleCloseDeleteConfirmationModal}
        onConfirmation={handleDelete}
      />
    </>
  )
}

export default KeyResultSectionTimelineCardBaseOptions
