import axios from 'axios'

import { BudConfig } from 'src/config'

export const getNewTaskManagementInstance = (config: BudConfig) =>
  axios.create({
    baseURL: config.publicRuntimeConfig.api.newApi,
  })
