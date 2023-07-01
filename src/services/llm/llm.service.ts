import { AxiosInstance } from 'axios'

import { SummarizeKeyResultInput, SummarizeKeyResultOutput } from './summarize-key-result.dto'

export class LlmService {
  constructor(private readonly client: AxiosInstance) {}

  async summarizeKeyResult(
    keyResultId: string,
    input: SummarizeKeyResultInput,
  ): Promise<SummarizeKeyResultOutput> {
    const { data } = await this.client.post<SummarizeKeyResultOutput>('/summarize/key-result', {
      referenceId: keyResultId,
      input,
    })

    return data
  }

  // Async sendFeedback(referenceId: string, feedback: number) {
  //   // Thumbs up/thumbs down

  // }

  // Async enhanceObjective(input: EnhanceObjectiveInput): ...
}
