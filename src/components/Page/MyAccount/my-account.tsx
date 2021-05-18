import { Divider, Flex } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { PageMetaHead, PageTitle } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import { SettingsAccount, SettingsSidebarMenu } from 'src/components/Settings'

import { PageHeader } from '../../Base/PageHeader/wrapper'

import messages from './messages'

const SettingsMyAccountPage = () => {
  const intl = useIntl()

  return (
    <PageContent>
      <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />

      <PageHeader>
        <PageTitle>{intl.formatMessage(messages.pageTitle)}</PageTitle>
      </PageHeader>

      <Flex gridGap={16}>
        <SettingsSidebarMenu />
        <Divider orientation="vertical" borderColor="black.200" height="auto" />

        <SettingsAccount />
      </Flex>
    </PageContent>
  )
}

export default SettingsMyAccountPage
