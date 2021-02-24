import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { IntlLink } from 'src/components/Base'

import SettingsSidebarMenuSectionButton from '../Button'

import messages from './messages'

const SettingsSidebarMenuSectionPreferences = () => {
  const intl = useIntl()

  return (
    <Flex direction="column" gridGap={3} pr={8}>
      <Heading as="h2" color="gray.300" fontWeight={700} fontSize="sm" textTransform="uppercase">
        {intl.formatMessage(messages.sectionTitle)}
      </Heading>

      <SettingsSidebarMenuSectionButton href="/settings/my-account" _active={{ bg: 'gray.50' }}>
        <IntlLink href="/settings/my-account">
          {intl.formatMessage(messages.firstOptionLabel)}
        </IntlLink>
      </SettingsSidebarMenuSectionButton>
    </Flex>
  )
}

export default SettingsSidebarMenuSectionPreferences
