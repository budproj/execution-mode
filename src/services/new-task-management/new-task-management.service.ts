import { AxiosInstance } from 'axios'

import { Except } from 'src/helpers/except'
import { NewTask } from 'src/components/Task/types'
export enum TASK_STATUS {
  PENDING = 'pending',
  TODO = 'toDo',
  DOING = 'doing',
  DONE = 'done',
}

export type Task = {
  _id: string
  team: string
  history: string[]
  status: TASK_STATUS
  title: string
  description: string
  dueDate: Date
  priority: number
  owner: string
  initialDate: Date
  attachments: string[]
  supportTeamMembers: string[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  active?: boolean
  orderindex: number
  key_result?: string
  cycle: string | null
}

export type TaskUpdate = {
  _id: string
  taskId: string
  oldState: ITaskStateInterface
  patches: ITaskPatchInterface[]
  newState: ITaskStateInterface
  author: IAuthor
  createdAt: string
}

export interface ITaskPatchInterface {
  key: TaskPatchsKeys
  value: string
}

export interface ITaskStateInterface {
  title: string
  priority: number
  dueDate: Date
  owner: string
  description: string
  supportTeam: string[]
  author?: IAuthor
}

export interface IAuthor {
  type: IAuthorType
  identifier: string
}

export enum TaskPatchsKeys {
  createdTask = 'createdTask',
  title = 'title',
  priority = 'priority',
  dueDate = 'dueDate',
  owner = 'owner',
  description = 'description',
  addAttachment = 'addAttachment',
  deleteAttachment = 'deleteAttachment',
  supportTeam = 'supportTeam',
}

export enum IAuthorType {
  USER = 'USER',
  WORKER = 'WORKER',
  LLM = 'LLM',
}

export type TaskInsert = Except<NewTask, 'id' | 'createdAt' | 'updatedAt' | 'history'>


export class NewTaskManagementService {
  constructor(private readonly client: AxiosInstance) {}

    async getAllTasks(data: string) {
    if (!data) {
      throw new Error('A team_id is required to get tasks')
    }

    const { data: response } = await this.client.get<NewTask[]>(`task-management/${data}/task/`)

    return response
  }
  
  
  async addTask(data: TaskInsert) {
    const { data: response } = await this.client.post<NewTask>(`task-management/f53c6168-9c21-42e3-b912-c4fe8acac849/task/`, data)
    return response
  }

  async getTasksByKr(team_id: string, id: string) {
    //const { data: response } = await this.client.get<NewTask>(`task-management/${team_id}/task/?kr=${id}`)
    const { data: response } = await this.client.get<NewTask[]>(`task-management/f53c6168-9c21-42e3-b912-c4fe8acac849/task/?kr=6d10cb65-e3d0-4753-92c0-dc065368c731`)
    return response
  }

  async removeTask(team_id: string, task_id: string) {
    //soft delete
    await this.client.put<NewTask>(`task-management/f53c6168-9c21-42e3-b912-c4fe8acac849/task/${task_id}`)
    //await this.client.put<NewTask>(`task-management/${team_id}/task/${task_id}`)
  }
/* TODO: Implement addTask, updateTask, getTask, getTaskUpdates, removeTask methods 
  async updateTask(data: Partial<Task>) {
    if (!data._id) {
      throw new Error('A id is required to update task')
    }

    const { data: response } = await this.client.patch<Task>(`task-management/f53c6168-9c21-42e3-b912-c4fe8acac849/task/${data._id}`, data)

    return response
  }

  async getTask(id: Task['_id']) {
    const { data: response } = await this.client.get<Task>(`task-management/f53c6168-9c21-42e3-b912-c4fe8acac849/task/`, {
      params: {
        id,
      },
    })

    return response
  }
*/
}
