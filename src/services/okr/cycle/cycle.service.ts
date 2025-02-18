import { AxiosInstance } from 'axios'

import { Cycle } from './@types'

export class CycleService {
  constructor(private readonly client: AxiosInstance) {}

  async getCycleTeam(teamId: string) {
    const { data } = await this.client.get<Cycle[]>(`cycle/${teamId}/`)
    return data
  }
}
