import { TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'

import { PageContent } from 'src/components/Base'
import TabsMenu from 'src/components/Page/Team/Tabs/tabs-menu'
import { Team } from 'src/components/Team/types'

import RetrospectiveTabContent from '../../../Routine/RetrospectiveTab/retrospective-tab-content'

// TODO: in future this must be replacet to ProjectTabContent
import TasksTabContent from './content/board-tab-content'
import OkrsTabContent from './content/okrs-tab-content'

interface ExploreTeamTabsProperties {
  teamId: Team['id']
  isLoading?: boolean
  activeTab?: string
}

const ExploreTeamTabs = ({ teamId, isLoading, activeTab }: ExploreTeamTabsProperties) => {
  const tabIndex = new Map([
    ['okrs', 0],
    ['tasks', 1],
    ['retrospective', 2],
  ])

  return (
    <Tabs isLazy variant="unstyled" index={tabIndex.get(activeTab ?? 'okrs')}>
      <TabsMenu teamId={teamId} />

      <PageContent>
        <TabPanels>
          <TabPanel padding="0px !important">
            <OkrsTabContent teamId={teamId} isLoading={isLoading} />
          </TabPanel>
          <TabPanel>
            <TasksTabContent teamId={teamId} isLoading={isLoading} />
          </TabPanel>
          <TabPanel padding="0px !important">
            <RetrospectiveTabContent teamId={teamId} isLoading={isLoading} />
          </TabPanel>
        </TabPanels>
      </PageContent>
    </Tabs>
  )
}

export default ExploreTeamTabs
