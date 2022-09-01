import { AxiosInstance } from 'axios'

export const customHeadersInjector = (instance: AxiosInstance) => {
  const token = '123'
  instance.defaults.headers.common.Authorization = token
}
