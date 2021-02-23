import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import SettingsSidebarMenuSectionButton from '../Button'

import messages from './messages'

const SettingsSidebarMenuSectionPreferences = () => {
  const intl = useIntl()

  return (
    <Flex direction="column" gridGap={3} pr={8}>
      <Heading as="h2" color="gray.300" fontWeight={700} fontSize="sm" textTransform="uppercase">
        {intl.formatMessage(messages.sectionTitle)}
      </Heading>

      <SettingsSidebarMenuSectionButton href="/settings" _active={{ bg: 'gray.50' }}>
        {intl.formatMessage(messages.firstOptionLabel)}
      </SettingsSidebarMenuSectionButton>
    </Flex>
  )
}

export default SettingsSidebarMenuSectionPreferences
