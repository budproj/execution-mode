import { AxiosInstance } from 'axios'

type MissioncControlUserTask = {
  userId: string
  weekId: string
  score: number
  templateId: string
  completed: boolean
}

export type GetUserTasksOutput = MissioncControlUserTask[]
export interface GetUserTasksRequest {
  userID: string
  teamID: string
}

export interface SendFeedbackRequest {
  completionId: string
  userId: string
  value: number
}

export class MissionControlService {
  constructor(private readonly client: AxiosInstance) {}

  async getUserTasks({ teamID, userID }: GetUserTasksRequest) {
    const { data } = await this.client.get<GetUserTasksOutput>('tasks', {
      params: { userID, teamID },
    })

    return data
  }
}
