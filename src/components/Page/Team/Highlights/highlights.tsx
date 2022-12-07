import { Stack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { Team } from 'src/components/Team/types'

import { TeamSectionWrapper } from '../Section/wrapper'

import HighlightSection, { HighlightCard } from './highlight-section'
import HighlightsSectionSkeleton from './highlights-section-skeleton'
import { useGetKeyResultsHighlights } from './hooks/getKeyRusultsHighlights'
import messages from './messages'

interface HighlightsProperties {
  teamId?: Team['id']
  isLoading?: boolean
}

export const Highlights = ({ teamId, isLoading }: HighlightsProperties) => {
  const intl = useIntl()
  const { data, setTeamId, loading: krsHighlightsLoading } = useGetKeyResultsHighlights()

  const dataLoading = isLoading ?? krsHighlightsLoading

  useEffect(() => {
    if (teamId) setTeamId(teamId)
  }, [setTeamId, teamId])

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
        {dataLoading ? (
          <HighlightsSectionSkeleton
            dataLenght={3}
            gridTemplate="1fr 1fr 1fr"
            title={intl.formatMessage(messages.teamMembersHighlightTitleSection)}
          />
        ) : (
          <HighlightSection
            title={intl.formatMessage(messages.teamMembersHighlightTitleSection)}
            gridTemplate="1fr 1fr 1fr"
            data={routineFlags}
          />
        )}

        {dataLoading ? (
          <HighlightsSectionSkeleton
            dataLenght={4}
            gridTemplate="1fr 1fr"
            title={intl.formatMessage(messages.teamKRsHighlightTitleSection)}
          />
        ) : (
          <HighlightSection
            title={intl.formatMessage(messages.teamKRsHighlightTitleSection)}
            gridTemplate="1fr 1fr"
            data={data}
          />
        )}
      </Stack>
    </TeamSectionWrapper>
  )
}
