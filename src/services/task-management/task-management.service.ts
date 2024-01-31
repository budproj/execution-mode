import { AxiosInstance } from 'axios'

export enum TASK_STATUS {
  PENDING = 'PENDING',
  TO_DO = 'TO_DO',
  DOING = 'DOING',
  DONE = 'DONE',
}

enum BOARD_TYPE {
  TEAM_TASKS = 'TEAM_TASKS',
  PROJECT_TASKS = 'PROJECT_TASKS',
}

export type Task = {
  id: string
  status: TASK_STATUS
  title: string
  description: string
  dueDate: Date
  priority: number
  owner: string
  attachments: string[]
  supportTeamMembers: string[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export type Board = {
  id: string
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
}

type GetTeamBoardOutput = Board
