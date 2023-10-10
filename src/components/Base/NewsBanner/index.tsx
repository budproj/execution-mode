import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Text,
  Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'
import { useIntl } from 'react-intl'

import bg from 'public/images/mission-control-preview.png'
import useLocalStorage from 'src/state/hooks/useLocalStorage/hook'

import messages from './messages'

export const newsBannerStorageKey = 'newBestPraticesLighthouse'

const NewsBanner = () => {
  const intl = useIntl()
  const router = useRouter()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { get, register } = useLocalStorage()

  useEffect(() => {
    const time = setTimeout(() => {
      const valueStoraged = get(newsBannerStorageKey)
      if (valueStoraged === false) {
        return
      }

      onOpen()
    }, 2300)

    return () => clearTimeout(time)
  }, [get, onOpen])

  const handleCloseBanner = useCallback(() => {
    register(newsBannerStorageKey, false)
    onClose()
  }, [onClose, register])

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} size="6xl" onClose={handleCloseBanner}>
      <ModalOverlay />
      <ModalContent borderRadius={15}>
        <ModalCloseButton color="brand.500" size="sm" />

        <ModalBody p="0" display="grid" gridTemplateColumns="1fr 1fr">
          <Box
            borderLeftRadius={15}
            backgroundImage={`url(${bg.src})`}
            width="480px"
            height="350px"
            backgroundRepeat="no-repeat"
          />
          <Box width="402px" paddingTop="30px" paddingLeft="50px">
            <Text color="brand.500" fontWeight={900} fontSize="40px">
              {intl.formatMessage(messages.newsBannerTitle)}
            </Text>
            <Text color="new-gray.700" fontWeight={450} fontSize="16px" marginTop="10px">
              {intl.formatMessage(messages.newsBannerDescription)}
            </Text>
            <Button
              bg="brand.500"
              color="white"
              _hover={{ color: 'white' }}
              marginTop="18px"
              onClick={async () => window.open('https://youtu.be/pwxQiEkYx9Q', '_blank')}
            >
              {intl.formatMessage(messages.newsBannerButton)}
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default NewsBanner
