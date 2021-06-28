import { AmplitudeClient } from 'amplitude-js'
import { createContext } from 'react'

import { defaultContext } from './constants'

export type AmplitudeContextValue = Record<string, AmplitudeClient | undefined>

export const AmplitudeContext = createContext<AmplitudeContextValue>(defaultContext)
