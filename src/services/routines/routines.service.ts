import { AxiosInstance } from 'axios'

import { HighlightCard } from 'src/components/Page/Team/Highlights/highlight-section'
import { FormQuestion } from 'src/components/Routine/Drawer/Questions/types'
import {
  AnswerDetails,
  AnswerSummary,
  OverviewData,
} from 'src/components/Routine/RetrospectiveTab/types'
import { UserRoutineDataProperties } from 'src/components/Team/RoutineHighlightsTable/types'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { RetrospectiveAnswer } from 'src/state/recoil/routine/retrospective-routine-answers'

import { RoutineSettings } from './types'

export class RoutinesService {
  constructor(private readonly client: AxiosInstance) {}

  async getSettings() {
    const { data: response } = await this.client.get<RoutineSettings>('settings')
    return response
  }

  async updateDisabledTeams(disabledTeams: RoutineSettings['disabledTeams']) {
    const { data: response } = await this.client.patch<RoutineSettings>('settings', {
      disabledTeams,
    })
    return response
  }

  async getAnswers(
    teamId: Team['id'],
    parsetToQueryTeamUsersIDS: string,
    after: Date,
    before: Date,
  ) {
    const { data: response } = await this.client.get<AnswerSummary[]>(
      `/answers/summary/${teamId}`,
      {
        params: {
          before,
          after,
          includeSubteams: false,
          teamUsersIds: parsetToQueryTeamUsersIDS,
        },
      },
    )
    return response
  }

  async deleteAnswer(answerId: AnswerSummary['id']) {
    if (answerId) {
      await this.client.delete(`/answer/${answerId}`)
    }
  }

  async getAnswerOverview(answerId: AnswerSummary['id'], before?: Date, after?: Date) {
    const parameters = {
      includeSubteams: false,
      before,
      after,
    }
    const { data: response } = await this.client.get<OverviewData>(
      `/answers/overview/${answerId ?? ''}`,
      { params: parameters },
    )
    return response
  }

  async getAnswerDetailed(answerId: AnswerSummary['id'], useLocaleFormated: string) {
    if (answerId) {
      const { data: response } = await this.client.get<AnswerDetails>(
        `answer/${answerId}?locale=${useLocaleFormated}`,
      )
      return response
    }
  }

  async getPendingRoutines() {
    const { data: response } = await this.client.get('/pending')
    return response
  }

  async getRoutineForm(useLocaleFormated: string) {
    const requestFormQuestionsPath = `bud-form?intl=${useLocaleFormated}`
    const { data: response } = await this.client.get<{ questions: FormQuestion[] }>(
      requestFormQuestionsPath,
    )
    return response
  }

  async createAnswer(answers: RetrospectiveAnswer[]) {
    const { data: response } = await this.client.post<Team[]>('/answer', answers)
    return response
  }

  async getFlags(id: Team['id']) {
    const { data: response } = await this.client.get<HighlightCard[] | undefined>(
      `/answers/flags/${id}`,
    )
    return response
  }

  async getAnswerOverviewFromUser(userId: User['id']) {
    const { data: response } = await this.client.get<UserRoutineDataProperties>(
      `/answers/overview/user/${userId}`,
    )
    return response
  }

  async createCompanySettings(companyId: Team['id']) {
    await this.client.post(`/settings/${companyId}`, {})
  }
}
