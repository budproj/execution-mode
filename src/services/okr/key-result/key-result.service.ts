import { AxiosInstance } from 'axios'

import { KeyResult } from './@types'

export class KeyResultService {
  constructor(private readonly client: AxiosInstance) {}

  async getKeyResultTeam(teamId: string, objectiveId: string) {
    const { data } = await this.client.get<KeyResult[]>(`kr/${teamId}/${objectiveId}/`)
    return data
  }
}
