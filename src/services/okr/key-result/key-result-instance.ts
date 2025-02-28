import axios from 'axios'

import { BudConfig } from 'src/config'

export const getKeyResultInstance = (config: BudConfig) =>
  axios.create({
    baseURL: config.publicRuntimeConfig.api.newApi,
  })
