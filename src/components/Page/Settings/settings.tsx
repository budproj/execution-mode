import { Divider, Flex } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { PageMetaHead, PageTitle } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import { SettingsCycles, SettingsMyProfile, SettingsSidebarMenu } from 'src/components/Settings'
import { SETTINGS_PATHS } from 'src/components/Settings/constants'

import { PageHeader } from '../../Base/PageHeader/wrapper'

import messages from './messages'

interface SettingsPageProperties {
  path?: SETTINGS_PATHS
}
const pageContentElement = new Map()

const SettingsPage = ({ path }: SettingsPageProperties) => {
  const intl = useIntl()

  pageContentElement.set(SETTINGS_PATHS.MY_PROFILE, <SettingsMyProfile />)
  pageContentElement.set(SETTINGS_PATHS.CYCLES, <SettingsCycles />)

  return (
    <PageContent>
      <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />

      <PageHeader>
        <PageTitle>{intl.formatMessage(messages.pageTitle)}</PageTitle>
      </PageHeader>

      <Flex gridGap={12}>
        <SettingsSidebarMenu />
        <Divider orientation="vertical" borderColor="black.200" height="auto" />

        {pageContentElement.get(path) || <SettingsMyProfile />}
      </Flex>
    </PageContent>
  )
}

export default SettingsPage
