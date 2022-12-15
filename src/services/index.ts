import { AxiosInstance } from 'axios'

import { BudConfig } from 'src/config'

import { getDataFromAmplitude } from './amplitude-user-profile'
import { getCommentsInstance } from './comments'
import { customHeadersInjector, errorResponseInjector } from './injectors'
import { getRoutinesInstance } from './routines'

export interface Services {
  routines: AxiosInstance
  comments: AxiosInstance
  amplitude: AxiosInstance
}

const configureInstance = (instance: AxiosInstance, authToken: string) => {
  customHeadersInjector(instance, authToken)
  errorResponseInjector(instance)

  return instance
}

export const getServices = async (
  getAuthToken: () => Promise<string>,
  config: BudConfig,
): Promise<Services> => {
  const authToken = await getAuthToken()

  return {
    routines: configureInstance(getRoutinesInstance(config), authToken),
    comments: configureInstance(getCommentsInstance(config), authToken),
    amplitude: getDataFromAmplitude(),
  }
}
