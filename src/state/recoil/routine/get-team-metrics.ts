/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useContext, useEffect, useState } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { OverviewData } from 'src/components/Routine/RetrospectiveTab/RoutinesOverview'
import { Team } from 'src/components/Team/types'

import { getRoutineDateRangeDateFormat } from './routine-dates-range'

export const getTeamMetrics = (teamId: Team['id'] | undefined) => {
  const { servicesPromise } = useContext(ServicesContext)

  const [answersOverview, setAnswersOverview] = useState<OverviewData>({
    overview: {
      feeling: [],
      productivity: [],
      roadblock: [],
    },
  })
  const { after, before } = getRoutineDateRangeDateFormat(new Date())

  const getAnswersOverview = useCallback(async () => {
    const { routines } = await servicesPromise

    if (teamId) {
      const answersOverview = await routines.getAnswerOverview(teamId, before, after)
      if (answersOverview) setAnswersOverview(answersOverview)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId, servicesPromise])

  useEffect(() => {
    getAnswersOverview()
  }, [getAnswersOverview])

  return answersOverview
}
