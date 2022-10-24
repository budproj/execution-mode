import { useContext, useEffect, useState } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { Team } from 'src/components/Team/types'

interface RoutineSettings {
  id: string
  companyId: string
  disabledTeams: string[]
  cron: string
}

const hasTeamOptedOut = (disabledTeamsIds: string[], teamId: string) => {
  return disabledTeamsIds.includes(teamId)
}

export const useRoutineNotificationSettings = (teamId: string) => {
  const { servicesPromise } = useContext(ServicesContext)
  const [companySettings, setCompanySettings] = useState<RoutineSettings>()

  const getRoutineNotificationSettings = async () => {
    const { routines } = await servicesPromise
    const { data } = await routines.get<RoutineSettings>('settings')

    if (data) {
      setCompanySettings(data)
    }
  }

  const setRoutineNotificationSettings = async (
    disabledTeams: RoutineSettings['disabledTeams'],
  ) => {
    const { routines } = await servicesPromise
    const { data } = await routines.patch<RoutineSettings>('settings', { disabledTeams })

    if (data) {
      setCompanySettings(data)
    }
  }

  const toggleDisabledTeam = (teamId: Team['id']) => {
    if (companySettings) {
      const teamIsDisabled = companySettings.disabledTeams.includes(teamId)
      const disabledTeams = teamIsDisabled
        ? companySettings.disabledTeams.filter((disabledTeamId) => disabledTeamId !== teamId)
        : [...companySettings.disabledTeams, teamId]

      setRoutineNotificationSettings(disabledTeams)
    }
  }

  useEffect(() => {
    getRoutineNotificationSettings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    teamOptedOut: hasTeamOptedOut(companySettings?.disabledTeams ?? [], teamId),
    toggleDisabledTeam,
  }
}
