import { AxiosInstance } from 'axios'

import { BudConfig } from 'src/config'

import { getCommentsInstance } from './comments'
import { customHeadersInjector, errorResponseInjector } from './injectors'
import { getLLMInstance } from './llm'
import { LlmService } from './llm/llm.service'
import { getNewTaskManagementInstance } from './new-task-management'
import { NewTaskManagementService } from './new-task-management/new-task-management.service'
import { getObjectiveInstance } from './objective'
import { ObjectiveService } from './objective/objective.service'
import { getCycleInstance } from './okr'
import { CycleService } from './okr/cycle/cycle.service'
import { getKeyResultInstance } from './okr/key-result/key-result-instance'
import { KeyResultService } from './okr/key-result/key-result.service'
import { getRoutinesInstance } from './routines'
import { RoutinesService } from './routines/routines.service'
import { getTaskManagementInstance } from './task-management'
import { TaskManagementService } from './task-management/task-management.service'
import { getTeamInstance } from './team'
import { TeamService } from './team/team.service'

export interface Services {
  routines: RoutinesService
  comments: AxiosInstance
  llm: LlmService
  taskManagement: TaskManagementService
  newTaskManagement: NewTaskManagementService
  keyResult: KeyResultService
  cycle: CycleService
  team: TeamService
  objective: ObjectiveService
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
    routines: new RoutinesService(configureInstance(getRoutinesInstance(config), authToken)),
    comments: configureInstance(getCommentsInstance(config), authToken),
    llm: new LlmService(configureInstance(getLLMInstance(config), authToken)),
    taskManagement: new TaskManagementService(
      configureInstance(getTaskManagementInstance(config), authToken),
    ),
    newTaskManagement: new NewTaskManagementService(
      configureInstance(getNewTaskManagementInstance(config), authToken),
    ),
    keyResult: new KeyResultService(configureInstance(getKeyResultInstance(config), authToken)),
    cycle: new CycleService(configureInstance(getCycleInstance(config), authToken)),
    team: new TeamService(configureInstance(getTeamInstance(config), authToken)),
    objective: new ObjectiveService(configureInstance(getObjectiveInstance(config), authToken)),
  }
}
