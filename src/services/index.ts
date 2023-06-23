import { AxiosInstance } from 'axios'

import { BudConfig } from 'src/config'

import { getCommentsInstance } from './comments'
import { customHeadersInjector, errorResponseInjector } from './injectors'
import { getLLMInstance } from './llm'
import { LlmService } from './llm/llm.service'
import { getRoutinesInstance } from './routines'

export interface Services {
  routines: AxiosInstance
  comments: AxiosInstance
  llm: LlmService
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
    llm: new LlmService(configureInstance(getLLMInstance(config), authToken)),
  }
}
