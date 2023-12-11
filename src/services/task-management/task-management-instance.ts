import axios from 'axios'

import { BudConfig } from 'src/config'

export const getTaskManagementInstance = (config: BudConfig) =>
  axios.create({
    baseURL:
      config.publicRuntimeConfig.api.taskManagement ??
      `${config.publicRuntimeConfig.api.restBase}/task-management`,
  })
