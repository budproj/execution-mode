import { AxiosInstance } from 'axios'

export const customHeadersInjector = async (instance: AxiosInstance, authToken: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${authToken}`
}
