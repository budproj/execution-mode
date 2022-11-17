import { Stack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { Team } from 'src/components/Team/types'

import { TeamSectionWrapper } from '../Section/wrapper'

import HighlightSection from './highlight-section'
import messages from './messages'
import { mockedTeamKRsHighlights, mockedTeamMembersHighlights } from './utils/mocked-data'

interface HighlightsProperties {
  teamId?: Team['id']
}

export const Highlights = ({ teamId }: HighlightsProperties) => {
  const intl = useIntl()

  return (
    <TeamSectionWrapper title={intl.formatMessage(messages.title)} overflowY="visible">
      <Stack spacing={6}>
        <HighlightSection
          title={intl.formatMessage(messages.teamMembersHighlightTitleSection)}
          gridTemplate="1fr 1fr 1fr"
          data={mockedTeamMembersHighlights}
        />

        <HighlightSection
          title={intl.formatMessage(messages.teamKRsHighlightTitleSection)}
          gridTemplate="1fr 1fr"
          data={mockedTeamKRsHighlights}
        />
      </Stack>
    </TeamSectionWrapper>
  )
}
