import { useContext, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { intlLocaleAtom } from 'src/state/recoil/intl'
import { routineFormQuestions } from 'src/state/recoil/routine/routine-form-questions'

export const useRoutineFormQuestions = () => {
  const { servicesPromise } = useContext(ServicesContext)
  const [routinesFormQuestions, setRoutinesFormQuestions] = useRecoilState(routineFormQuestions)
  const intlLocale = useRecoilValue(intlLocaleAtom)

  // Const useLocaleFormated = intlLocale === 'en-US' ? 'en' : intlLocale.toLocaleLowerCase()
  // const requestFormQuestionsPath = `/bud-form?intl=${useLocaleFormated}`

  const requestFormQuestionsPath = '/bud-form?intl=pt-br'

  const getRoutineQuestions = async () => {
    const { routines } = await servicesPromise
    const { data: formQuestions } = await routines.get(requestFormQuestionsPath)
    setRoutinesFormQuestions(formQuestions)
  }

  useEffect(() => {
    getRoutineQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return routinesFormQuestions
}
