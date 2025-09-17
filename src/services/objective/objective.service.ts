import { AxiosInstance } from 'axios'

import { Objective } from './@types'

export class ObjectiveService {
  constructor(private readonly client: AxiosInstance) {}

  async patch(objective_id: string, data: Partial<Objective>) {
    const { data: response } = await this.client.patch<Objective>(
      `api/okr/objective/${objective_id}`,
      data,
    )
    return response
  }
}
