import { Stack, Tab, TabList, Tag } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import newTagMessages from 'src/components/Base/MainAppBar/messages'
import { Team } from 'src/components/Team/types'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { isAnswerSummaryLoad } from 'src/state/recoil/routine/is-answers-summary-load'

import messages from '../messages'

interface TabsMenuProperties {
  teamId: Team['id']
}

const StyledTab = styled(Tab)`
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 2px solid transparent;

  &:focus {
    box-shadow: none;
  }
`

const TabsMenu = ({ teamId }: TabsMenuProperties) => {
  const intl = useIntl()
  const { dispatch } = useEvent(EventType.RETROSPECTIVE_TAB_CLICK)
  const setIsAnswerSummaryLoaded = useSetRecoilState(isAnswerSummaryLoad)

  const router = useRouter()

  const handleClick = (hashTab: string) => {
    setIsAnswerSummaryLoaded(false)
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
    <Stack bg="white" boxShadow="0px 22px 25px -22px rgba(83, 83, 191, 0.4)">
      <TabList borderTop="1px solid #D9E2F6" pt={2} marginX="5rem !important">
        <StyledTab
          px={8}
          color="new-gray.800"
          _selected={{ color: 'brand.500', borderColor: 'brand.500' }}
          paddingBottom={3}
          onClick={() => handleClick(intl.formatMessage(messages.okrsTeamTab))}
        >
          {intl.formatMessage(messages.okrsTeamTab)}
        </StyledTab>
        <StyledTab
          px={8}
          color="new-gray.800"
          _selected={{ color: 'brand.500', borderBottom: '2px solid #6F6EFF' }}
          paddingBottom={3}
          onClick={() => {
            handleClick(intl.formatMessage(messages.retrospectiveTeamTab))
            dispatch({})
          }}
        >
          {intl.formatMessage(messages.retrospectiveTeamTab)}
          <Tag size="sm" variant="solid" colorScheme="brand" ml={2}>
            {intl.formatMessage(newTagMessages.newItem)}
          </Tag>
        </StyledTab>
      </TabList>
    </Stack>
  )
}

export default TabsMenu
