import axios from 'axios'

import { BudConfig } from 'src/config'

export const getNewTaskManagementInstance = (config: BudConfig) =>
  axios.create({
    baseURL:
     "http://127.0.0.1:8000/"
  })
