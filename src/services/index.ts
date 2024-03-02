import { AxiosInstance } from 'axios'

import { BudConfig } from 'src/config'

import { getCommentsInstance } from './comments'
import { customHeadersInjector, errorResponseInjector } from './injectors'
import { getLLMInstance } from './llm'
import { LlmService } from './llm/llm.service'
import { getMissionControlInstance } from './mission-control'
import { MissionControlService } from './mission-control/mission-control.service'
import { getRoutinesInstance } from './routines'
import { getTaskManagementInstance } from './task-management'
import { TaskManagementService } from './task-management/task-management.service'

export interface Services {
  routines: AxiosInstance
  comments: AxiosInstance
  llm: LlmService
  missionControl: MissionControlService
  taskManagement: TaskManagementService
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
    missionControl: new MissionControlService(
      configureInstance(getMissionControlInstance(config), authToken),
    ),
    taskManagement: new TaskManagementService(
      configureInstance(getTaskManagementInstance(config), authToken),
    ),
  }
}
