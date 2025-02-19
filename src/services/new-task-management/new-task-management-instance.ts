import axios from 'axios'

//import { BudConfig } from 'src/config'

export const getNewTaskManagementInstance = () =>
  axios.create({
    baseURL:
     "http://127.0.0.1:8000/"
  })

  /* substituir localhost pela nova rota do backend  --> config: BudConfig
  axios.create({
    baseURL:
    config.publicRuntimeConfig.api.newTaskManagement ??
    `${config.publicRuntimeConfig.api.restBase}/new-task-management`
  })*/