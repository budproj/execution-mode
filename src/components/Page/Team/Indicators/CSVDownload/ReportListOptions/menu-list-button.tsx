import { Button, MenuButton } from '@chakra-ui/react'
import React from 'react'

import { ChevronDown } from 'src/components/Icon'

type MenuListButtonProperties = {
  title?: string
  isOpen: boolean
}

const IndicatorsReportDownloadMenuListButton = ({ title, isOpen }: MenuListButtonProperties) => {
  return (
    <MenuButton
      as={Button}
      borderWidth={1}
      borderColor="new-gray.500"
      color="new-gray.800"
      borderRadius={4}
      px=".6rem"
      py="0.35rem"
      h={35}
      fontSize={14}
      iconSpacing={12}
      w={60}
      rightIcon={
        <ChevronDown
          desc="menu"
          ml={5}
          fontSize="xs"
          fill="black.900"
          stroke="black.900"
          transition="0.2s transform ease-in"
          transform={isOpen ? 'rotate(180deg)' : 'none'}
        />
      }
      _hover={{
        color: 'new-gray.600',
        borderColor: 'new-gray.400',
      }}
    >
      {title}
    </MenuButton>
  )
}

export default IndicatorsReportDownloadMenuListButton
