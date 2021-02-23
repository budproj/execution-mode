import { Divider, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { PageHead } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import { PageProperties } from 'src/components/Page/types'
import { SettingsProfile, SettingsSidebarMenu } from 'src/components/Settings'
import { pageTitleAtom } from 'src/state/recoil/page'

import messages from './messages'

const SettingsPage = ({ isRootPage }: PageProperties) => {
  const intl = useIntl()
  const setPageTitle = useSetRecoilState(pageTitleAtom)

  useEffect((): void => {
    setPageTitle(intl.formatMessage(messages.pageTitle))
  }, [intl, setPageTitle])

  return (
    <PageContent showBreadcrumb={!isRootPage}>
      <PageHead title={messages.metaTitle} description={messages.metaDescription} />

      <Flex gridGap={16}>
        <SettingsSidebarMenu />
        <Divider orientation="vertical" borderColor="black.200" height="auto" />

        <SettingsProfile />
      </Flex>
    </PageContent>
  )
}

export default SettingsPage
