import axios from 'axios'

import { BudConfig } from 'src/config'

export const getCommentsInstance = (config: BudConfig) =>
  axios.create({
    baseURL:
      config.publicRuntimeConfig.api.comments ??
      `${config.publicRuntimeConfig.api.restBase}/comments`,
  })
