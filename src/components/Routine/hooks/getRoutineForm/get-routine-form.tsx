import { useContext, useEffect } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { FormQuestion } from 'src/components/Routine/Drawer/Questions/types'
import { intlLocaleAtom } from 'src/state/recoil/intl'
import {
  routineFormQuestions,
  retrospectiveRoutineSelector,
} from 'src/state/recoil/routine/routine-form-questions'

export const useRoutineFormQuestions = () => {
  const { servicesPromise } = useContext(ServicesContext)
  const setRoutinesFormQuestions = useSetRecoilState(routineFormQuestions)
  const routinesFormQuestions = useRecoilValue(retrospectiveRoutineSelector)
  const intlLocale = useRecoilValue(intlLocaleAtom)

  // Const useLocaleFormated = intlLocale === 'en-US' ? 'en' : intlLocale.toLocaleLowerCase()
  // const requestFormQuestionsPath = `/bud-form?intl=${useLocaleFormated}`

  const getRoutineQuestions = async () => {
    const { routines } = await servicesPromise
    const { data } = await routines.get<{ questions: FormQuestion[] }>('bud-form?intl=pt-br')
    const mappedQuestions = data.questions.map((question) => ({
      ...question,
      hidden: false,
    }))

    setRoutinesFormQuestions(mappedQuestions)
  }

  useEffect(() => {
    getRoutineQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { routinesFormQuestions, setRoutinesFormQuestions }
}
