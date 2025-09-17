import { AxiosInstance } from 'axios'

import { KeyResult, KeyResultWithTasks } from './@types'

export class KeyResultService {
  constructor(private readonly client: AxiosInstance) {}

  async getKeyResultTeam(teamId: string) {
    const { data } = await this.client.get<KeyResult[]>(`api/okr/key_result/${teamId}`)
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
    const { data } = await this.client.get<KeyResult>(`kr/${keyResultId}/`)
    return data
  }
}
