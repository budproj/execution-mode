import { AxiosInstance } from 'axios'

import { SendFeedbackOutput } from './send-feedback.dto'
import { SummarizeKeyResultInput, SummarizeKeyResultOutput } from './summarize-key-result.dto'

export interface CreateCompletionRequest<T> {
  referenceId: string
  author: {
    id: string
    teamId: string
    companyId: string
  }
  input: T
}

export interface SendFeedbackRequest {
  completionId: string
  userId: string
  value: number
}

export class LlmService {
  constructor(private readonly client: AxiosInstance) {}

  async summarizeKeyResult(
    request: CreateCompletionRequest<SummarizeKeyResultInput>,
  ): Promise<SummarizeKeyResultOutput> {
    const { data } = await this.client.post<SummarizeKeyResultOutput>(
      '/summarize/key-result',
      request,
    )

    return data
  }

  async sendFeedback(request: SendFeedbackRequest): Promise<SendFeedbackOutput> {
    // Thumbs up/thumbs down
    const { data } = await this.client.post<SendFeedbackOutput>('/feedback', request)

    return data
  }

  // Async enhanceObjective(input: EnhanceObjectiveInput): ...
}
