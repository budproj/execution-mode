import { AxiosInstance } from 'axios'

import { BudConfig } from 'src/config'

import { getCommentsInstance } from './comments'
import { customHeadersInjector, errorResponseInjector } from './injectors'
import { getLLMInstance } from './llm'
import { LlmService } from './llm/llm.service'
import { getNewTaskManagementInstance } from './new-task-management'
import { NewTaskManagementService } from './new-task-management/new-task-management.service'
import { getRoutinesInstance } from './routines'
import { getTaskManagementInstance } from './task-management'
import { TaskManagementService } from './task-management/task-management.service'

export interface Services {
  routines: AxiosInstance
  comments: AxiosInstance
  llm: LlmService
  taskManagement: TaskManagementService
  newTaskManagement: NewTaskManagementService
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
    taskManagement: new TaskManagementService(
      configureInstance(getTaskManagementInstance(config), authToken),
    ),
    newTaskManagement: new NewTaskManagementService(
      configureInstance(getNewTaskManagementInstance(config), authToken),
    ),
  }
}
