import { ParsedUrlQuery } from 'querystring'

import { AxiosInstance } from 'axios'

import { NewTask } from 'src/components/Task/types'
import { Except } from 'src/helpers/except'

import { TaskComment, TaskCommentInsert } from './@types/task-comment.type'
import { TaskUpdate } from './@types/task-update.type'
import { Task } from './@types/task.type'

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

export class TaskManagementService {
  constructor(private readonly client: AxiosInstance) {}

  async getAllTasks(parameters: ParsedUrlQuery) {
    /* 
      Accepted parameters 
      1. kr: Filter Key Result by id
      2. cycle: Filter cicle by id
      3. last: "last <0-100>" filter date by last x days
      4. since/upto: since + Date define start date, upto + Date define end
    */

    const { data: response } = await this.client.get<Task[]>(`api/task-manager/task`, {
      params: {
        team_id: parameters.team_id,
        deleted_at: parameters.deleted_at,
        key_result_id: parameters.key_result_id,
        cy: parameters.cy,
        show_done: parameters.show_done,
      },
    })
    return response
  }

  async getTask(id: Task['id']) {
    const { data: response } = await this.client.get<Task>(`api/task-manager/task/${id}`)
    return response
  }

  async addTask(data: TaskInsert) {
    const { data: response } = await this.client.post<NewTask>(`api/task-manager/task`, data)
    return response
  }

  async removeTask(id: Task['id']) {
    await this.client.delete<NewTask>(`api/task-manager/task/${id}`)
  }

  async updateTask(id: Task['id'], data: Partial<TaskUpdate>) {
    if (!id) {
      throw new Error('A id is required to update task')
    }

    const { data: response } = await this.client.patch<Task>(`api/task-manager/task/${id}`, data)

    return response
  }

  async addTaskComment(data: TaskCommentInsert) {
    const { data: response } = await this.client.post<TaskComment>(
      `task-management/task/comments`,
      data,
    )

    return response
  }

  async getTaskComments(id: Task['id']) {
    const { data: response } = await this.client.get<TaskComment[]>(
      `task-management/task/comments/${id}`,
    )

    return response
  }

  async removeTaskComments(id: TaskComment['id']) {
    const { data: response } = await this.client.delete<TaskComment>(
      `task-management/task/comments/${id}`,
    )

    return response
  }
}
