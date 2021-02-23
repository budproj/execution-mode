import React from 'react'

import { ButtonActivableByURL } from 'src/components/Base'
import { ButtonActivableByURLProperties } from 'src/components/Base/ButtonActivableByURL/button-activable-by-url'

const SettingsSidebarMenuSectionButton = (properties: ButtonActivableByURLProperties) => (
  <ButtonActivableByURL
    variant="ghost"
    colorScheme="gray"
    justifyContent="flex-start"
    {...properties}
  />
)

export default SettingsSidebarMenuSectionButton
