import { DrawerOverlay, useToken, ModalOverlayProps } from '@chakra-ui/react'
import React, { ComponentType } from 'react'

interface ColorizeOverlayProperties extends ModalOverlayProps {
  Component?: ComponentType<ModalOverlayProps>
}

export const ColorizedOverlay = ({ Component, ...rest }: ColorizeOverlayProperties) => {
  Component ??= DrawerOverlay

  const [newGray800]: string[] = useToken('colors', ['new-gray.800'])

  // This is a hack to possible use transparency in our color palette
  // 80 is the alfa channel for 50% transparency
  const newGray800WithTransparency = `${newGray800}80`

  return <Component backgroundColor={newGray800WithTransparency} {...rest} />
}
