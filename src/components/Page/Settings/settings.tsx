import { Divider, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { PageMetaHead, PageTitle } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import {
  SettingsCycles,
  SettingsMyProfile,
  SettingsSidebarMenu,
  SettingsUsers,
} from 'src/components/Settings'
import { CompanyMenuProperties } from 'src/components/Settings/SidebarMenu/Section/Company/company'
import { SETTINGS_PATHS } from 'src/components/Settings/constants'
import { GraphQLEffect } from 'src/components/types'

import { PageHeader } from '../../Base/PageHeader/wrapper'

import messages from './messages'

interface SettingsPageProperties {
  path?: SETTINGS_PATHS
  permissions?: CompanyMenuProperties['permissions']
}

const SettingsPage = ({ path, permissions }: SettingsPageProperties) => {
  const [canMount, setCanMount] = useState(false)

  const intl = useIntl()
  const { push } = useRouter()

  const pageContentElement = {
    [SETTINGS_PATHS.MY_PROFILE]: SettingsMyProfile,
    [SETTINGS_PATHS.CYCLES]: SettingsCycles,
    [SETTINGS_PATHS.USERS]: SettingsUsers,
  }

  const SettingsPageComponent = pageContentElement[path ?? SETTINGS_PATHS.MY_PROFILE]

  useEffect(() => {
    if (!permissions) {
      return
    }

    if (
      path === SETTINGS_PATHS.MY_PROFILE ||
      (path === SETTINGS_PATHS.CYCLES && permissions?.cycle?.update === GraphQLEffect.ALLOW) ||
      (path === SETTINGS_PATHS.USERS && permissions?.user?.update === GraphQLEffect.ALLOW)
    ) {
      setCanMount(true)
      return
    }

    push('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissions])

  return (
    <PageContent>
      <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />

      <PageHeader>
        <PageTitle>{intl.formatMessage(messages.pageTitle)}</PageTitle>
      </PageHeader>

      <Flex gridGap={12}>
        <SettingsSidebarMenu />
        <Divider orientation="vertical" borderColor="black.200" height="auto" />
        {canMount && permissions && <SettingsPageComponent permissions={permissions} />}
      </Flex>
    </PageContent>
  )
}

export default SettingsPage
