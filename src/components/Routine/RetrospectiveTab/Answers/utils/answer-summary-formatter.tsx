import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'

import { User } from 'src/components/User/types'
import { usersCompany } from 'src/state/recoil/team/users-company'

import { AnswerSummary } from '../../retrospective-tab-content'

type AnswerSummaryFormmaterData = {
  requestedUsersIDs: Array<User['id']>
  answerSummary?: AnswerSummary[]
}

const useAnswerSummaryFormatter = () => {
  const usersData = useRecoilValue(usersCompany)

  const filteredUserData = useCallback(
    (userId: User['id']) => {
      const searchedUserData = usersData.find(({ id }) => id === userId)
      if (searchedUserData) return searchedUserData
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return {} as User
    },
    [usersData],
  )

  const formattedAnswerSummary = ({
    requestedUsersIDs,
    answerSummary,
  }: AnswerSummaryFormmaterData): AnswerSummary[] => {
    const answers = requestedUsersIDs.map((userId) => {
      const { fullName, picture } = filteredUserData(userId)
      const { id, latestStatusReply, timestamp, commentCount } =
        answerSummary?.find((answer) => answer.userId === userId) ?? {}

      return {
        id,
        userId,
        name: fullName,
        picture,
        latestStatusReply,
        timestamp,
        commentCount,
      }
    })

    return answers
  }

  return { formattedAnswerSummary }
}

export default useAnswerSummaryFormatter
