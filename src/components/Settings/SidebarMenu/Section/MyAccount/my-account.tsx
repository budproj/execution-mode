import { Flex, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useIntl } from 'react-intl'

import { IntlLink } from 'src/components/Base'

import SettingsSidebarMenuSectionButton from '../Button'

import messages from './messages'

const SettingsSidebarMyAccountMenuSectionPreferences = () => {
  const intl = useIntl()
  const { route } = useRouter()

  return (
    <Flex direction="column" gridGap={3} pr={8}>
      <Heading
        as="h2"
        color="gray.300"
        fontWeight={700}
        fontSize="xs"
        textTransform="uppercase"
        pl={4}
      >
        {intl.formatMessage(messages.sectionTitle)}
      </Heading>

      <IntlLink href="/settings/my-profile">
        <SettingsSidebarMenuSectionButton
          href="/settings/my-profile"
          isActive={Boolean(route === '/settings' || route === '/settings/my-profile')}
        >
          {intl.formatMessage(messages.firstOptionLabel)}
        </SettingsSidebarMenuSectionButton>
      </IntlLink>
    </Flex>
  )
}

export default SettingsSidebarMyAccountMenuSectionPreferences
