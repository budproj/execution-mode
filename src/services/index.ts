import { AxiosInstance } from 'axios'

import { customHeadersInjector, errorResponseInjector } from './injectors'
import { routinesInstance } from './routines'

const configureInstance = (instance: AxiosInstance) => {
  customHeadersInjector(instance)
  errorResponseInjector(instance)

  return instance
}

export default {
  routines: configureInstance(routinesInstance),
}
