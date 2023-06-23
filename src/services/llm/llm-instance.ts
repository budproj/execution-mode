import axios from 'axios'

import { BudConfig } from 'src/config'

export const getLLMInstance = (config: BudConfig) =>
  axios.create({
    baseURL:
      config.publicRuntimeConfig.api.llm ??
      `${config.publicRuntimeConfig.api.restBase}/business/llm`,
  })
