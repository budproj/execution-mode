import { useContext, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { answerDetailedAtom } from 'src/state/recoil/routine/answer'

import { AnswerDetails } from '../../RetrospectiveTab/Answers/types'
import { AnswerType } from '../../RetrospectiveTab/retrospective-tab-content'

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
    const { data } = await routines
      .get<AnswerDetails>(`answer/${answerId}?locale=${useLocaleFormated}`)
      .catch((error) => {
        console.error(error)
        return { data: undefined }
      })

    if (data) {
      setAnswerDetailed(data)
      setIsUserDetailedLoaded(true)
    }
  }

  return { getAnswerDetailed, isUserDetailedLoaded }
}
