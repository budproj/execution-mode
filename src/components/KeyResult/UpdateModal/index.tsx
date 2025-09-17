import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import ThreeUsersIcon from 'src/components/Icon/Users'

import { DataSelectMenu } from './DataSelectMenu'
import messages from './messages'

interface UpdateModalProprerties {
  value: string
  data: Map<string, string>
  updateType: string
  isOpen: boolean
  onClose: () => void
  onSubmit: (teamId: string) => void
}

export const UpdateModal = ({
  value,
  data,
  updateType,
  isOpen,
  onClose,
  onSubmit,
}: UpdateModalProprerties) => {
  const intl = useIntl()

  const [selectedItem, setSelectedItem] = useState<string>(value)

  const handleSelect = () => {
    onSubmit(selectedItem)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} size="100%" onClose={onClose}>
      <ModalOverlay />
      <ModalContent width="90%" maxWidth="470px">
        <ModalBody>
          <Flex flexDir="column" gap={12}>
            <Heading display="flex" flexDir="column" justifyContent="center" alignItems="center">
              <ThreeUsersIcon desc="sda" fill="brand.500" fontSize={60} mt={4} />
              <Text mt={7} color="gray.500" fontWeight={500} as="h3" fontSize={24}>
                Alterar o {updateType} deste OKR
              </Text>
              <Text
                mt={5}
                textAlign="center"
                color="gray.400"
                fontWeight={400}
                fontSize={16}
                maxW={340}
              >
                {intl.formatMessage(messages.modalBody)}
              </Text>
            </Heading>

            <DataSelectMenu
              value={selectedItem}
              options={data}
              onChange={(newFormat) => setSelectedItem(newFormat)}
            />

            <Box display="flex" flexDir="column" alignItems="center" width="100%" gap={2}>
              <Button
                bg="brand.500"
                color="black.50"
                fontSize={16}
                fontWeight={700}
                _hover={{ background: 'brand.400', color: 'black.50' }}
                paddingY={7}
                width="100%"
                onClick={handleSelect}
              >
                {intl.formatMessage(messages.confirmModalButton)}
              </Button>
              <Button
                fontSize={16}
                fontWeight={700}
                color="brand.500"
                _hover={{ color: 'brand.400' }}
                pt={7}
                width="100%"
                onClick={() => onClose()}
              >
                {intl.formatMessage(messages.closeModalButton)}
              </Button>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
