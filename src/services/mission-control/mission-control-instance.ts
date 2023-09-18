import axios from 'axios'

import { BudConfig } from 'src/config'

export const getMissionControlInstance = (config: BudConfig) =>
  axios.create({
    baseURL:
      config.publicRuntimeConfig.api.missionControl ??
      `${config.publicRuntimeConfig.api.restBase}/business/mission-control`,
  })
