import { AxiosInstance } from 'axios'

import { Team } from './@types'

export class TeamService {
  constructor(private readonly client: AxiosInstance) {}

  async getTeamByCompany(company_id: string) {
    const { data: response } = await this.client.get<Team[]>(`api/team/company/${company_id}`)
    return response
  }
}
