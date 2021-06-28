import { useContext } from 'react'

import { defaultProject } from '../../../components/Base/AmplitudeProvider/constants'
import { AmplitudeContext } from '../../../components/Base/AmplitudeProvider/context'

type AmplitudeHook = []

export const useAmplitude = (project?: string): AmplitudeHook => {
  project ??= defaultProject

  const context = useContext(AmplitudeContext)
  const client = context[project]
  console.log(client, 'tag')

  return []
}
