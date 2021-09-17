import { DrawerOverlay, DrawerProps, useToken } from '@chakra-ui/react'
import React from 'react'

type ColorizedDrawerOverlayProperties = {
  children: DrawerProps['children']
}

export const ColorizedDrawerOverlay = (properties: ColorizedDrawerOverlayProperties) => {
  const [newGray800]: string[] = useToken('colors', ['new-gray.800'])

  // This is a hack to possible use transparency in our color palette
  // 80 is the alfa channel for 50% transparency
  // TODO: modify our color palette to use transparencies
  const newGray800WithTransparency = `${newGray800}80`

  return <DrawerOverlay backgroundColor={newGray800WithTransparency} {...properties} />
}
