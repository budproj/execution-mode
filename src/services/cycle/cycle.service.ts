import { AxiosInstance } from 'axios'

import { Cycle } from './@types'

export class CycleService {
  constructor(private readonly client: AxiosInstance) {}

  async getTeamAllCycles(teamId: string) {
    const { data } = await this.client.get<Cycle[]>(`api/cycle/team/${teamId}/all`)
    return data
  }

  async getTeamCycle(teamId: string) {
    const { data } = await this.client.get<Cycle[]>(`api/cycle/team/${teamId}`)
    return data
  }
}
