import { AxiosInstance } from 'axios'

import { Objective } from './@types'

export class ObjectiveService {
  constructor(private readonly client: AxiosInstance) {}

  async listObjectivesByTeamId(teamId: string) {
    const { data: response } = await this.client.get<Objective[]>(`api/objective/team/${teamId}`)
    return response
  }

  async listPersonalObjectives(userId: string) {
    const { data: response } = await this.client.get<Objective[]>(
      `api/objective/personal/${userId}`,
    )
    return response
  }

  async patch(objective_id: string, data: Partial<Objective>) {
    const { data: response } = await this.client.patch<Objective>(
      `api/objective/${objective_id}`,
      data,
    )
    return response
  }
}
