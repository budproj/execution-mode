import { AxiosInstance } from 'axios'

import { Except } from 'src/helpers/except'

export enum TASK_STATUS {
  pending = 'pending',
  toDo = 'toDo',
  doing = 'doing',
  done = 'done',
}

export type Task = {
  _id: string
  boardId: string
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
  active?: boolean
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

export type TaskInsert = Except<Task, '_id' | 'createdAt' | 'updatedAt'>


export class NewTaskManagementService {
  constructor(private readonly client: AxiosInstance) {}

  async getAllTasks(data: string) {
    if (!data) {
      throw new Error('A team_id is required to get tasks')
    }

    const { data: response } = await this.client.get<Task[]>(`task-management/${data}/task/`)
    return response
  }
  
}
