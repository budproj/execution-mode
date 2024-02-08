import { AxiosInstance } from 'axios'

import { Except } from 'src/helpers/except'

export enum TASK_STATUS {
  pending = 'pending',
  toDo = 'toDo',
  doing = 'doing',
  done = 'done',
}

enum BOARD_TYPE {
  TEAM_TASKS = 'TEAM_TASKS',
  PROJECT_TASKS = 'PROJECT_TASKS',
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
}

export type TaskInsert = Except<Task, '_id' | 'createdAt' | 'updatedAt'>

export type Board = {
  _id: string
  title?: string
  type: BOARD_TYPE
  teamsIds?: string[]
  tasks: Task[]
  order: {
    pending: string[]
    toDo: string[]
    doing: string[]
    done: string[]
  }
  createdAt: Date
  updateadAt: Date
}

type GetTeamBoardInput = {
  teamId: string
}

export class TaskManagementService {
  constructor(private readonly client: AxiosInstance) {}

  async getTeamBoard({ teamId }: GetTeamBoardInput) {
    const { data } = await this.client.get<GetTeamBoardOutput>(`boards`, {
      params: {
        teamId,
      },
    })
    return data
  }

  async addTask(data: TaskInsert) {
    const { data: response } = await this.client.post<Task>(`tasks`, data)
    return response
  }

  async updateTask(data: Partial<Task>) {
    if (!data._id) {
      throw new Error('A id is required to update task')
    }

    const { data: response } = await this.client.patch<Task>(`tasks/${data._id}`, data)

    return response
  }
}

type GetTeamBoardOutput = Board
