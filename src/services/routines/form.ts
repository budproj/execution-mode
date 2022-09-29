import { AxiosInstance, AxiosResponse } from 'axios'

import { FormQuestion } from 'src/components/Routine/Drawer/Questions/types'

type formRequestData = {
  intl: string
}

interface httpResponse {
  questions: FormQuestion[]
}

export default (httpClient: AxiosInstance) => ({
  getForm: async ({ intl }: formRequestData) => {
    const response: AxiosResponse<httpResponse> = await httpClient.get(`bud-form?intl=${intl}`)

    let errors
    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText,
      }
    }

    return {
      data: response.data,
      errors,
    }
  },
})
