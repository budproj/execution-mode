import { useContext } from 'react'
import { useSetRecoilState } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { answerDetailedAtom } from 'src/state/recoil/routine/answer'

import { AnswerDetails } from '../../RetrospectiveTab/Answers/types'
import { AnswerType } from '../../RetrospectiveTab/retrospective-tab-content'

interface useAnswerDetailedProperties {
  getAnswerDetailed(answerId: AnswerType['id']): void
}

export const useAnswerDetailed = (): useAnswerDetailedProperties => {
  const { servicesPromise } = useContext(ServicesContext)
  const setAnswerDetailed = useSetRecoilState(answerDetailedAtom)

  const getAnswerDetailed = async (answerId: AnswerType['id']) => {
    const { routines } = await servicesPromise
    const { data } = await routines.get<AnswerDetails>(`answer?${answerId}`)

    if (data) {
      setAnswerDetailed(data)
    }
  }

  return { getAnswerDetailed }
}
