import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Button,
  Flex,
  Heading,
} from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import WarningIcon from 'src/components/Icon/Warning'

import messages from './messages'

export interface ConfirmationModalProperties {
  isOpen: boolean
  onClose: () => void
  onConfirmation: () => void
  titleText?: string
  confirmationButtonText?: string
  cancelButtonText?: string
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirmation,
  titleText,
  confirmationButtonText,
  cancelButtonText,
}: ConfirmationModalProperties) => {
  const intl = useIntl()

  return (
    <Modal isOpen={isOpen} size="lg" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Flex direction="column" gridGap={12}>
            <Flex direction="column" gridGap={4} alignItems="center" textAlign="center">
              <WarningIcon
                desc={intl.formatMessage(messages.iconDesc)}
                w={10}
                h="auto"
                fill="red.500"
                stroke="red.500"
              />
              <Heading as="h3" fontSize="lg" color="gray.800">
                {titleText ?? intl.formatMessage(messages.titleFallback)}
              </Heading>
            </Flex>

            <Flex direction="column" gridGap={4}>
              <Button
                variant="solid"
                colorScheme="red"
                textTransform="uppercase"
                fontSize="sm"
                onClick={onConfirmation}
              >
                {confirmationButtonText ?? intl.formatMessage(messages.confirmationButtonFallback)}
              </Button>

              <Button
                variant="ghost"
                colorScheme="brand"
                textTransform="uppercase"
                fontSize="sm"
                onClick={onClose}
              >
                {cancelButtonText ?? intl.formatMessage(messages.cancelButtonFallback)}
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmationModal
