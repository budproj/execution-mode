import { Divider, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import { PageMetaHead, PageTitle } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import { SettingsCycles, SettingsMyProfile, SettingsSidebarMenu } from 'src/components/Settings'

import { PageHeader } from '../../Base/PageHeader/wrapper'

import messages from './messages'

const SettingsPage = () => {
  const intl = useIntl()
  const [selectedRoute, setSelectedRoute] = useState<string>('/settings/my-profile')

  // eslint-disable-next-line unicorn/consistent-function-scoping
  function consoleRoute(route: string) {
    setSelectedRoute(() => route)
  }

  return (
    <PageContent>
      <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />

      <PageHeader>
        <PageTitle>{intl.formatMessage(messages.pageTitle)}</PageTitle>
      </PageHeader>

      <Flex gridGap={16}>
        <SettingsSidebarMenu props={consoleRoute} />
        <Divider orientation="vertical" borderColor="black.200" height="auto" />
        {selectedRoute === '/settings/my-profile' ||
          (selectedRoute === '/settings' && <SettingsMyProfile />)}
        {selectedRoute === '/settings/cycles' && <SettingsCycles />}
      </Flex>
    </PageContent>
  )
}

export default SettingsPage
