import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Text,
  Tag,
} from '@chakra-ui/react'
import React, { useCallback, useEffect } from 'react'
import { useIntl } from 'react-intl'

import bg from 'public/images/new-task-feature-2.png'
import useLocalStorage from 'src/state/hooks/useLocalStorage/hook'

import messages from './messages'

export const newsBannerStorageKey = 'newTasksFeature'

const NewsBanner = () => {
  const intl = useIntl()

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
            width="100%"
            height="100%"
            backgroundRepeat="no-repeat"
            padding={0}
          />
          <Box width="500px" paddingTop="30px" paddingLeft="50px">
            <Tag bg="brand.500" color="white" fontSize={18} padding="3px 9px" mb="10px">
              Novidade!
            </Tag>
            <Text color="brand.500" fontWeight={900} textTransform="uppercase" fontSize="35px">
              {intl.formatMessage(messages.newsBannerTitle)}
            </Text>
            <Text color="new-gray.700" fontWeight={450} fontSize="16px" marginTop="10px" mb="20px">
              {intl.formatMessage(messages.newsBannerDescription)}
            </Text>
            {/* <Button
              bg="brand.500"
              color="white"
              _hover={{ color: 'white' }}
              marginTop="18px"
              onClick={async () => window.open('https://youtu.be/pwxQiEkYx9Q', '_blank')}
            >
              {intl.formatMessage(messages.newsBannerButton)}
            </Button> */}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default NewsBanner
