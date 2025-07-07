import { useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { answerDetailedAtom } from 'src/state/recoil/routine/answer'

import { AnswerType } from '../../RetrospectiveTab/types'

interface useAnswerDetailedProperties {
  isUserDetailedLoaded: boolean
  getAnswerDetailed(answerId: AnswerType['id'], locale: string): void
}

export const useAnswerDetailed = (): useAnswerDetailedProperties => {
  const { servicesPromise } = useContext(ServicesContext)
  const setAnswerDetailed = useSetRecoilState(answerDetailedAtom)
  const [isUserDetailedLoaded, setIsUserDetailedLoaded] = useState(false)

  const getAnswerDetailed = async (answerId: AnswerType['id'], locale = 'en') => {
    const useLocaleFormated = locale === 'en-US' ? 'en' : locale.toLocaleLowerCase()
    setIsUserDetailedLoaded(false)
    const { routines } = await servicesPromise
    const data = await routines.getAnswerDetailed(answerId, useLocaleFormated)

    if (data) {
      setAnswerDetailed(data)
      setIsUserDetailedLoaded(true)
    }
  }

  return { getAnswerDetailed, isUserDetailedLoaded }
}

export const useGetAnswersDetailedMutation = ({
  answerId,
  locale = 'en',
}: {
  answerId?: AnswerType['id']
  locale: string
}) => {
  const { servicesPromise } = useContext(ServicesContext)

  const query = useQuery({
    queryKey: [`routines:getAnswers:${answerId ?? ''}`, answerId],
    queryFn: async () => {
      if (!answerId) return
      const { routines } = await servicesPromise
      const useLocaleFormated = locale === 'en-US' ? 'en' : locale.toLocaleLowerCase()
      const data = await routines.getAnswerDetailed(answerId, useLocaleFormated)
      return data
    },
  })

  return query
}
