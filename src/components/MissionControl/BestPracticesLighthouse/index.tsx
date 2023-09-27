import { Stack, Tooltip } from '@chakra-ui/react'
import React, { useCallback, useContext, useEffect, useState } from 'react'

import PieChartWithNeedle from 'src/components/Base/Charts/pie-chart-with-needle'
import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { MissionControlTeamScore } from 'src/services/mission-control/mission-control.service'

interface BestPracticesLighthouseProperties {
  teamID: string
}

const BestPracticesLighthouse = ({ teamID }: BestPracticesLighthouseProperties) => {
  const { servicesPromise } = useContext(ServicesContext)
  const [teamScore, setTeamScore] = useState<MissionControlTeamScore['teamScore']>()

  const getUserTasks = useCallback(async () => {
    const { missionControl } = await servicesPromise
    const data = await missionControl.getTeamScore({ teamID })
    setTeamScore(data.teamScore)
  }, [servicesPromise, teamID])

  useEffect(() => {
    getUserTasks()
  }, [getUserTasks])

  const calculateTeamGoal = useCallback(
    (teamGoal: number | undefined) => {
      if (!teamGoal) return 10
      if (teamGoal === 10) return 10
      if (teamScore) {
        if (teamScore?.available === 0) return 10
        return (teamScore.teamGoal / teamScore.available) * 100 + 30
      }

      return 10
    },
    [teamScore],
  )

  return (
    <Tooltip
      label="Todas as tarefas realizadas por você e seu companheiros irão melhorar o a pontuação geral de seu time. Atingir a meta já é um excelente indicatívo de evolução nas boas práticas"
      placement="top"
    >
      <Stack position="relative" top="10">
        <PieChartWithNeedle
          value={
            teamScore?.progress ? Math.floor((teamScore.progress / teamScore.available) * 100) : 0
          }
          goalValue={calculateTeamGoal(teamScore?.teamGoal)}
          ir={80}
          or={120}
        />
      </Stack>
    </Tooltip>
  )
}

export default BestPracticesLighthouse
