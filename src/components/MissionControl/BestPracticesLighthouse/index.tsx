import { Stack } from '@chakra-ui/react'
import React, { useCallback, useContext, useEffect, useState } from 'react'

import PieChartWithNeedle from 'src/components/Base/Charts/pie-chart-with-needle'
import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { MissionControlTeamScore } from 'src/services/mission-control/mission-control.service'

interface BestPracticesLighthouseProperties {
  teamID: string
}

const BestPracticesLighthouse = ({ teamID }: BestPracticesLighthouseProperties) => {
  const { servicesPromise } = useContext(ServicesContext)
  const [teamScore, setTeamScore] = useState<MissionControlTeamScore>()

  const getUserTasks = useCallback(async () => {
    const { missionControl } = await servicesPromise
    const data = await missionControl.getTeamScore({ teamID })
    setTeamScore(data)
  }, [servicesPromise, teamID])

  useEffect(() => {
    getUserTasks()
  }, [getUserTasks])

  return (
    <Stack position="relative">
      <PieChartWithNeedle goalValue={teamScore?.available ?? 10} value={teamScore?.progress ?? 0} />
    </Stack>
  )
}

export default BestPracticesLighthouse
