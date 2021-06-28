import React, { ReactElement } from 'react'

import { defaultProject } from './constants'
import { AmplitudeContext } from './context'
import { getNoSSRInstance } from './no-ssr-instance'

type AmplitudeProviderProperties = {
  children: ReactElement
  project?: string
}

export const AmplitudeProvider = ({ children, project }: AmplitudeProviderProperties) => {
  project ??= defaultProject

  const context = {
    [project]: getNoSSRInstance(project),
  }

  return <AmplitudeContext.Provider value={context}>{children}</AmplitudeContext.Provider>
}
