import axios from 'axios'

import { BudConfig } from 'src/config'

export const getRoutinesInstance = (config: BudConfig) =>
  axios.create({
    baseURL:
      config.publicRuntimeConfig.api.routines ??
      `${config.publicRuntimeConfig.api.restBase}/routines`,
  })
