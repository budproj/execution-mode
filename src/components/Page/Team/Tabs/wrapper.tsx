import { TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { PageContent } from 'src/components/Base'
import TabsMenu from 'src/components/Page/Team/Tabs/tabs-menu'
import { Team } from 'src/components/Team/types'

import RetrospectiveTabContent from '../../../Routine/RetrospectiveTab/retrospective-tab-content'
import messages from '../messages'

import OkrsTabContent from './content/okrs-tab-content'

interface ExploreTeamTabsProperties {
  teamId: Team['id']
  isLoading?: boolean
  activeTab?: string
}

const ExploreTeamTabs = ({ teamId, isLoading, activeTab }: ExploreTeamTabsProperties) => {
  const intl = useIntl()

  return (
    <Tabs
      isLazy
      variant="unstyled"
      index={
        activeTab === intl.formatMessage(messages.retrospectiveTeamTab).toLocaleLowerCase() ? 1 : 0
      }
    >
      <TabsMenu teamId={teamId} />

      <PageContent>
        <TabPanels>
          <TabPanel padding="0px !important">
            <OkrsTabContent teamId={teamId} isLoading={isLoading} />
          </TabPanel>
          <TabPanel padding="0px !important">
            <RetrospectiveTabContent teamId={teamId} />
          </TabPanel>
        </TabPanels>
      </PageContent>
    </Tabs>
  )
}

export default ExploreTeamTabs
