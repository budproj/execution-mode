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
  Spinner,
} from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'
import { Area } from 'react-easy-crop/types'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { userAtomFamily } from 'src/state/recoil/user'

import { User } from '../types'

import { getCroppedPictureFile } from './canvas'
import { UserUpdatePictureModalInterface } from './interface'
import messages from './messages'
import query from './query.gql'

interface UpdateUserMutationResult {
  updateUser: User
}

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
  const [user, setUser] = useRecoilState(userAtomFamily(userID))
  const intl = useIntl()

  const [updatePicture, { loading }] = useMutation<UpdateUserMutationResult>(
    query.UpdateUserPicture,
    {
      onCompleted: (data) => {
        setUser({
          ...user,
          ...data.updateUser,
        })
      },
    },
  )

  const handleClose = () => {
    setIsModalOpen(false)
    if (onClose) onClose(false)
  }

  const handleCrop = useCallback(
    (_: unknown, croppedAreaPixels: Area) => {
      setCroppedArea(croppedAreaPixels)
    },
    [setCroppedArea],
  )

  const handleSubmit = async () => {
    if (!src || !croppedArea) return

    const file = await getCroppedPictureFile(src, croppedArea)
    await updatePicture({
      variables: {
        userID,
        file,
      },
    })

    handleClose()
  }

  useEffect(() => {
    setIsModalOpen(Boolean(isOpen))
  }, [isOpen, setIsModalOpen])

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
            style={{
              cropAreaStyle: {
                color: 'rgba(255, 255, 255, .7)',
              },
            }}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCrop}
          />

          <Box
            position="absolute"
            display="flex"
            w="full"
            h="full"
            justifyContent="center"
            alignItems="center"
            background="rgba(0,0,0,.8)"
            top={0}
            left={0}
            hidden={!loading}
          >
            <Spinner size="xl" color="brand.400" />
          </Box>
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

          <Button variant="solid" colorScheme="brand" disabled={loading} onClick={handleSubmit}>
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
