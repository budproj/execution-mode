import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { IntlLink } from 'src/components/Base'
import { GraphQLEffect } from 'src/components/types'

import SettingsSidebarMenuSectionButton from '../Button'

import messages from './messages'

export interface CompanyMenuProperties {
  permissions: {
    user: {
      update?: GraphQLEffect
      create?: GraphQLEffect
    }
    cycle: {
      update?: GraphQLEffect
      create?: GraphQLEffect
    }
  }
}

const SettingsSidebarCompanyMenuSectionPreferences = ({ permissions }: CompanyMenuProperties) => {
  const intl = useIntl()

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

      {permissions?.user?.update === GraphQLEffect.ALLOW && (
        <IntlLink href="/settings/users">
          <SettingsSidebarMenuSectionButton href="/settings/users">
            {intl.formatMessage(messages.firstOptionLabel)}
          </SettingsSidebarMenuSectionButton>
        </IntlLink>
      )}

      {permissions?.cycle?.update === GraphQLEffect.ALLOW && (
        <IntlLink href="/settings/cycles">
          <SettingsSidebarMenuSectionButton href="/settings/cycles">
            {intl.formatMessage(messages.secondOptionLabel)}
          </SettingsSidebarMenuSectionButton>
        </IntlLink>
      )}
    </Flex>
  )
}

export default SettingsSidebarCompanyMenuSectionPreferences
