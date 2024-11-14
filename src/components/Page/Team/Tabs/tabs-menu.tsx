import { Box, Stack, Tab, TabList, Tag } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React from 'react'
import { useIntl } from 'react-intl'

import tabMessages from 'src/components/Base/MainAppBar/messages'
import { Team } from 'src/components/Team/types'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'

import messages from '../messages'

interface TabsMenuProperties {
  teamId: Team['id']
}

const StyledTab = styled(Tab)`
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  width: 160px;
  border-bottom: 2px solid transparent;
  &:focus {
    box-shadow: none;
  }
`

const TabsMenu = ({ teamId }: TabsMenuProperties) => {
  const intl = useIntl()
  const { dispatch } = useEvent(EventType.RETROSPECTIVE_TAB_CLICK)
  const { dispatch: dispatchTaskManagerTabClick } = useEvent(EventType.TASK_MANAGER_TAB_CLICK)

  const router = useRouter()

  const handleClick = (hashTab: string) => {
    router.push(
      {
        query: {
          id: teamId,
          activeTab: hashTab.toLocaleLowerCase(),
        },
      },
      undefined,
      { shallow: true },
    )
  }

  return (
    <Stack display="flex" alignItems="center">
      <TabList borderRadius="10px" bg="white" width="fit-content">
        <StyledTab
          color="new-gray.800"
          _selected={{ color: 'white', background: 'brand.500' }}
          borderRadius="10px 0px 0px 10px"
          onClick={() => handleClick('okrs')}
        >
          {intl.formatMessage(messages.okrsTeamTab)}
        </StyledTab>
        <Box width="1px" bg="new-gray.500" />

        <>
          <StyledTab
            px={8}
            color="new-gray.800"
            justifyContent="center"
            alignItems="center"
            _selected={{ color: 'white', background: 'brand.500' }}
            paddingBottom={3}
            onClick={() => {
              handleClick('tasks')
              dispatchTaskManagerTabClick({})
            }}
          >
            {intl.formatMessage(messages.tasksTeamTab)}
          </StyledTab>
          <Box width="1px" bg="new-gray.500" />
        </>
        <StyledTab
          px={8}
          color="new-gray.800"
          _selected={{ color: 'white', background: 'brand.500' }}
          borderRadius="0px 10px 10px 0px"
          onClick={() => {
            handleClick('retrospective')
            dispatch({})
          }}
        >
          <div id="retrospective-tab">{intl.formatMessage(messages.retrospectiveTeamTab)}</div>
        </StyledTab>
      </TabList>
    </Stack>
  )
}

export default TabsMenu
