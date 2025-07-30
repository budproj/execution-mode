import { AxiosInstance } from 'axios'

import { Cycle, CycleFilter } from './@types'

export class CycleService {
  constructor(private readonly client: AxiosInstance) {}

  async getTeamCyclesDate(teamId: string) {
    const { data } = await this.client.get<CycleFilter[]>(`api/okr/cycle/date/${teamId}`)
    return data
  }

  async getTeamCycle(teamId: string) {
    const { data } = await this.client.get<Cycle[]>(`api/okr/cycle/${teamId}`)
    return data
  }
}
