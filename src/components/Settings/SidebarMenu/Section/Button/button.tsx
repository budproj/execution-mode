import React from 'react'

import { ButtonActivableByURL } from 'src/components/Base'
import { ButtonActivableByURLProperties } from 'src/components/Base/ButtonActivableByURL/button-activable-by-url'

const SettingsSidebarMenuSectionButton = (properties: ButtonActivableByURLProperties) => (
  <ButtonActivableByURL
    variant="ghost"
    colorScheme="gray"
    justifyContent="flex-start"
    fontSize="sm"
    _active={{ bg: 'transparent', color: 'brand.500' }}
    _hover={{ bg: 'gray.50', color: 'brand.500' }}
    {...properties}
  />
)

export default SettingsSidebarMenuSectionButton
