import { Box, Flex, Text, Spinner } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'

import UserAvatar from 'src/components/User/Avatar'
import { UserUpdatePictureModal } from 'src/components/User/UpdatePictureModal/wrapper'
import { useLocalFileData } from 'src/state/hooks/useLocalFileData/hook'

import { UserEditableAvatarProperties } from './interface'
import messages from './messages'

export const UserEditableAvatar = ({
  userID,
  name,
  picture,
  isDisabled,
  size,
  variantAvatar,
  ...rest
}: UserEditableAvatarProperties) => {
  const intl = useIntl()
  const [isHovering, setIsHovering] = useState(false)
  const [isCropping, setIsCropping] = useState(false)
  const [localPictureData, localPictureLoading, setPictureFile, resetPictureData] =
    useLocalFileData()
  const pictureInput = useRef<HTMLInputElement>(null)

  const isLoading = Boolean(!localPictureLoading)

  const handleMouseEnter = () => {
    if (!isDisabled) setIsHovering(true)
  }

  const handleMouseLeave = () => {
    if (!isDisabled) setIsHovering(false)
  }

  const handleClick = () => {
    if (!isDisabled) pictureInput.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const file = event.target.files[0]
    setPictureFile(file)
  }

  const handleCropClose = () => {
    setIsCropping(false)
    resetPictureData()
  }

  useEffect(() => {
    if (localPictureData) setIsCropping(true)
  }, [localPictureData, setIsCropping])

  return (
    <>
      <Box
        position="relative"
        cursor={isDisabled ? 'auto' : 'pointer'}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        {...rest}
      >
        <UserAvatar size={size} name={name} src={picture} variant={variantAvatar} />

        <Flex
          position="absolute"
          w="full"
          h="full"
          justifyContent="center"
          alignItems="center"
          color="brand.400"
          background="rgba(0,0,0,.5)"
          hidden={isLoading}
          top={0}
        >
          <Spinner />
        </Flex>

        <Flex
          position="absolute"
          bottom={0}
          w="full"
          h="50%"
          textAlign="center"
          background="linear-gradient(transparent, #000000)"
          direction="column"
          justifyContent="flex-end"
          p={1}
          opacity={isHovering ? 1 : 0}
          transition=".3s opacity ease-in-out"
        >
          <Text color="white" fontSize="xs" fontWeight={700} textTransform="uppercase">
            {intl.formatMessage(messages.hoverMessage)}
          </Text>
        </Flex>
      </Box>

      <input
        ref={pictureInput}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <UserUpdatePictureModal
        userID={userID}
        src={localPictureData}
        isOpen={isCropping}
        onClose={handleCropClose}
      />
    </>
  )
}
