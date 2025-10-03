import axios from 'axios'

import { BudConfig } from 'src/config'

export const getObjectiveInstance = (config: BudConfig) =>
  axios.create({
    baseURL: config.publicRuntimeConfig.api.newApi,
  })
