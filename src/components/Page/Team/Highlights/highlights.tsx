import { Stack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { Team } from 'src/components/Team/types'

import { TeamSectionWrapper } from '../Section/wrapper'

import HighlightSection, { HighlightCard } from './highlight-section'
import messages from './messages'

interface HighlightsProperties {
  teamId?: Team['id']
}

export const Highlights = ({ teamId }: HighlightsProperties) => {
  const intl = useIntl()

  const [routineFlags, setRoutineFlags] = useState<HighlightCard[]>()
  const { servicesPromise } = useContext(ServicesContext)

  useEffect(() => {
    const getRoutinesHighlights = async (id: Team['id']) => {
      const { routines } = await servicesPromise
      const { data: flags } = await routines.get<HighlightCard[]>(`/answers/flags/${id}`)
      setRoutineFlags(flags)
    }

    if (teamId) {
      getRoutinesHighlights(teamId)
    }
  }, [servicesPromise, teamId])

  return (
    <TeamSectionWrapper title={intl.formatMessage(messages.title)} overflowY="visible">
      <Stack spacing={6}>
        <HighlightSection
          title={intl.formatMessage(messages.teamMembersHighlightTitleSection)}
          gridTemplate="1fr 1fr 1fr"
          data={routineFlags}
        />

        {/* <HighlightSection
          title={intl.formatMessage(messages.teamKRsHighlightTitleSection)}
          gridTemplate="1fr 1fr"
          data={mockedTeamKRsHighlights}
        /> */}
      </Stack>
    </TeamSectionWrapper>
  )
}
