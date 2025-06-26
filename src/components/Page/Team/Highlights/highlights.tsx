import { useQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { Team } from 'src/components/Team/types'

import { TeamSectionWrapper } from '../Section/wrapper'

import GET_KEY_RESULTS_HIGHLIGHTS from './get-key-results-highlights.gql'
import HighlightSection, { HighlightCard } from './highlight-section'
import HighlightsSectionSkeleton from './highlights-section-skeleton'
import messages from './messages'
import { CARD_TYPES } from './utils/card-types'
import { KeyResultsHighlights, parsedData } from './utils/parsed-highlights-data'

interface HighlightsProperties {
  teamId?: Team['id']
  isLoading?: boolean
}

type HightlightCard = {
  type: CARD_TYPES
  quantity: number
}

export const Highlights = ({ teamId, isLoading }: HighlightsProperties) => {
  const intl = useIntl()
  const [teamHighlights, setTeamHighlights] = useState<HightlightCard[]>([])

  const [routineFlags, setRoutineFlags] = useState<HighlightCard[]>()
  const { servicesPromise } = useContext(ServicesContext)

  const { loading: krsHighlightsLoading } = useQuery<KeyResultsHighlights>(
    GET_KEY_RESULTS_HIGHLIGHTS,
    {
      variables: { teamId },
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        const dataParsed = parsedData(data.getTeamFlags)

        if (dataParsed.length > 0) setTeamHighlights(dataParsed)
      },
    },
  )

  const dataLoading = isLoading ?? krsHighlightsLoading
  useEffect(() => {
    const getRoutinesHighlights = async (id: Team['id']) => {
      const { routines } = await servicesPromise
      const flags = await routines.getFlags(id)
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
          <HighlightsSectionSkeleton dataLenght={3} gridTemplate="1fr 1fr 1fr" />
        ) : (
          routineFlags && (
            <HighlightSection
              title={intl.formatMessage(messages.teamMembersHighlightTitleSection)}
              gridTemplate="1fr 1fr 1fr"
              data={routineFlags}
            />
          )
        )}

        {dataLoading ? (
          <HighlightsSectionSkeleton dataLenght={4} gridTemplate="1fr 1fr" />
        ) : (
          <HighlightSection
            title={intl.formatMessage(messages.teamKRsHighlightTitleSection)}
            gridTemplate="1fr 1fr"
            data={teamHighlights}
          />
        )}
      </Stack>
    </TeamSectionWrapper>
  )
}
