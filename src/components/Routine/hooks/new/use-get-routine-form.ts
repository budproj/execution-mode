import { useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState, useRecoilValue } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import {
  routineFormQuestions,
  retrospectiveRoutineSelector,
} from 'src/state/recoil/routine/routine-form-questions'

export const useRoutineFormQuestions = () => {
  const { servicesPromise } = useContext(ServicesContext)
  const setRoutinesFormQuestions = useSetRecoilState(routineFormQuestions)
  const routinesFormQuestions = useRecoilValue(retrospectiveRoutineSelector)
  const intl = useIntl()

  const useLocaleFormated = intl.locale === 'en-US' ? 'en' : intl.locale.toLocaleLowerCase()

  const getRoutineQuestions = async () => {
    const { routines } = await servicesPromise
    const data = await routines.getRoutineForm(useLocaleFormated)

    if (data?.questions) {
      const mappedQuestions = data.questions.map((question) => ({
        ...question,
        hidden: Boolean(question?.conditional),
      }))

      setRoutinesFormQuestions(mappedQuestions)
    }
  }

  useEffect(() => {
    getRoutineQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { routinesFormQuestions, setRoutinesFormQuestions }
}
