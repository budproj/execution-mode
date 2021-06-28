import { useContext } from 'react'

import { defaultProject } from '../../../components/Base/AmplitudeProvider/constants'
import { AmplitudeContext } from '../../../components/Base/AmplitudeProvider/context'

import { identifyFactory } from './identify-factory'
import { AmplitudeUser, AmplitudeUserGroups } from './types'

type AmplitudeHook = {
  identify: (userID: string, userData: AmplitudeUser, userGroups?: AmplitudeUserGroups) => void
}

export const useAmplitude = (project?: string): AmplitudeHook => {
  project ??= defaultProject

  const context = useContext(AmplitudeContext)
  const client = context[project]

  const identify = identifyFactory(client)

  return {
    identify,
  }
}
