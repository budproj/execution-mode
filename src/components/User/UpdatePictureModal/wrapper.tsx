import { useMutation } from '@apollo/client'
import {
  Box,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Button,
} from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'
import { Area } from 'react-easy-crop/types'
import { useIntl } from 'react-intl'

import { getCroppedPictureFile } from './canvas'
import { UserUpdatePictureModalInterface } from './interface'
import messages from './messages'
import query from './query.gql'

export const UserUpdatePictureModal = ({
  userID,
  src,
  isOpen,
  initialZoom,
  onClose,
}: UserUpdatePictureModalInterface) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen ?? false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(initialZoom)
  const [croppedArea, setCroppedArea] = useState<Area>()
  const intl = useIntl()

  const [updatePicture, { data, loading }] = useMutation(query.UpdateUserPicture)

  const handleClose = () => {
    setIsModalOpen(false)
    if (onClose) onClose(false)
  }

  const handleCrop = useCallback(
    (_, croppedAreaPixels: Area) => {
      setCroppedArea(croppedAreaPixels)
    },
    [setCroppedArea],
  )

  const handleSubmit = async () => {
    if (!src || !croppedArea) return

    const file = await getCroppedPictureFile(src, croppedArea)
    console.log(file, 'tag-2')
    await updatePicture({
      variables: {
        userID,
        file,
      },
    })
  }

  useEffect(() => {
    setIsModalOpen(Boolean(isOpen))
  }, [isOpen, setIsModalOpen])

  console.log(data, loading, 'tag')

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent p={16} borderRadius={0}>
        <Box minW={64} minH={64}>
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropSize={{ width: 300, height: 300 }}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCrop}
          />
        </Box>

        <ModalFooter
          position="absolute"
          p={4}
          bottom={-16}
          left={0}
          w="full"
          background="white"
          gridGap={4}
        >
          <Slider defaultValue={initialZoom} min={1} max={5} step={0.1} onChange={setZoom}>
            <SliderTrack background="gray.100">
              <SliderFilledTrack background="brand.400" />
            </SliderTrack>
            <SliderThumb />
          </Slider>

          <Button variant="solid" colorScheme="brand" onClick={handleSubmit}>
            {intl.formatMessage(messages.submitButtonLabel)}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

UserUpdatePictureModal.defaultProps = {
  initialZoom: 1,
}
