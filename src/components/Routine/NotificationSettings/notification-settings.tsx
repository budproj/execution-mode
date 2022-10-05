import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Heading,
  Text,
  Flex,
  Switch,
  useToken,
  Image,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

interface NotificationSettingsModalProperties {
  isOpen: boolean
  isActive: boolean
  onClose: () => void
  onToggle: (isActive: boolean) => void
}

const StyledSwitch = styled(Switch)`
  --switch-track-width: 80px;
  --switch-track-height: 40px;

  .chakra-switch__track {
    padding: 6px;

    &[aria-checked='true'],
    &[data-checked] {
      background: ${({ color }) => color};
    }
  }
`

export const NotificationSettingsModal = ({
  isOpen,
  isActive,
  onClose,
  onToggle,
}: NotificationSettingsModalProperties) => {
  const [brand500]: string[] = useToken('colors', ['brand.500'])
  const intl = useIntl()

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isActive = event.target?.checked
    onToggle(isActive)
  }

  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody px={8}>
          <Image
            src="/images/woman-on-clock.svg"
            alt={intl.formatMessage(messages.routineNotificationSettingIcon)}
            maxW="220px"
            margin="-20px auto 20px"
          />

          <Box textAlign="center">
            <Heading as="h2" fontSize="21px" color="new-gray.900" mb={4}>
              {intl.formatMessage(messages.routineNotificationSettingTitle)}
            </Heading>
            <Text fontSize="14px" color="new-gray.600">
              {intl.formatMessage(messages.routineNotificationSettingSubtitle)}
            </Text>
          </Box>

          <Flex bgColor="new-gray.200" px={6} py={5} mt={7} alignItems="center" borderRadius="10px">
            <Box>
              <Heading as="h3" fontSize="16px" color="new-gray.800" mb={2}>
                {intl.formatMessage(messages.routineNotificationDescriptionTitle)}
              </Heading>
              <Text fontSize="14px" lineHeight="18px" color="new-gray.600">
                {intl.formatMessage(messages.routineNotificationDescriptionSubtitle)}
              </Text>
            </Box>
            <StyledSwitch
              isChecked={isActive}
              color={brand500}
              size="lg"
              ml={6}
              onChange={handleToggle}
            />
          </Flex>
          <Button
            display="block"
            mt="30px"
            height="48px"
            w="full"
            bgColor="brand.500"
            color="white"
            textTransform="uppercase"
            _hover={{}}
            onClick={onClose}
          >
            {intl.formatMessage(messages.routineNotificationButton)}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
