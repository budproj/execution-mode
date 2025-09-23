import { AxiosInstance } from 'axios'

import { KeyResult, KeyResultWithTasks } from './@types'

export class KeyResultService {
  constructor(private readonly client: AxiosInstance) {}

  async patch(keyResultId: string, data: Partial<KeyResult>) {
    const { data: response } = await this.client.patch<KeyResult>(
      `api/key-result/${keyResultId}`,
      data,
    )
    return response
  }

  async getKeyResultTeam(teamId: string) {
    const { data } = await this.client.get<KeyResult[]>(`api/key-result/team/${teamId}`)
    return data
  }

  async getKeyResultByOwner(owner: string, objectiveId: string) {
    const { data } = await this.client.get<KeyResult[]>(`kr/owner/${owner}/${objectiveId}/`)
    return data
  }

  async getKeyResultByOwnerWithTasks(owner: string) {
    const { data } = await this.client.get<KeyResultWithTasks[]>(`kr/task/${owner}/`)
    return data
  }

  async getKeyResultById(keyResultId: string) {
    const { data } = await this.client.get<KeyResult>(`api/key-result/${keyResultId}`)
    return data
  }
}
