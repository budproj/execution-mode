import { AxiosInstance } from 'axios'

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

  // Async sendFeedback(referenceId: string, feedback: number) {
  //   // Thumbs up/thumbs down

  // }

  // Async enhanceObjective(input: EnhanceObjectiveInput): ...
}
