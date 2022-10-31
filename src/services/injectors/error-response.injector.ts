import { AxiosInstance } from 'axios'

export const errorResponseInjector = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const canThrowAnError = error.request.status === 500

      if (canThrowAnError) {
        throw new Error(error.message)
      }

      return error
    },
  )
}
