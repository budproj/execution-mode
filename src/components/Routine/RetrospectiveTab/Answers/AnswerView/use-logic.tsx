/* eslint-disable import/order */
import { NextRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IntlShape } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { hasCallToActionOnAnswerDetails } from 'src/state/recoil/routine/has-call-to-action'

import { useGetCommentsByEntityMutation } from '../../../hooks/getCommentsByEntity'
import { useGetAnswersDetailedMutation } from '../../../hooks/new/use-get-answer-detailed'

import { COMMENT_DOMAIN } from '../utils/constants'

interface useLogicProperties {
  router: NextRouter
  intl: IntlShape
}

export const useLogic = ({ router, intl }: useLogicProperties) => {
  // Local state
  const [answerId, setAnswerId] = useState<string | undefined>()
  const [entity, setEntity] = useState<string | undefined>()

  // Global state
  const setHasCallToAction = useSetRecoilState(hasCallToActionOnAnswerDetails)

  // Hooks
  const { data: comments } = useGetCommentsByEntityMutation({
    entity,
  })

  const { data: answerDetailed, isLoading: isUserDetailedLoaded } = useGetAnswersDetailedMutation({
    answerId,
    locale: intl.locale,
  })

  useEffect(() => {
    const answerQuery = router?.query?.answerId
    const answerId = Array.isArray(answerQuery) ? answerQuery[0] : answerQuery
    setAnswerId(answerId)
    setEntity(`${COMMENT_DOMAIN.routine}:${answerId ?? ''}`)
  }, [router.query])

  useEffect(() => {
    if (answerDetailed && entity) {
      setHasCallToAction(needCallToAction)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerId, answerDetailed])

  // Utils
  const needCallToAction = () => {
    if (!answerDetailed) return false
    return answerDetailed.answers.some((answer) => {
      if (answer.values) {
        if (
          answer.type === 'value_range' &&
          Number(answer.values[answer.values.length - 1].value) <= 3
        )
          return true

        if (
          answer.type === 'emoji_scale' &&
          Number(answer.values[answer.values.length - 1].value) <= 2
        )
          return true

        if (answer.type === 'road_block' && answer.values[answer.values.length - 2].value === 'y')
          return true
      }

      return false
    })
  }

  return {
    answerId,
    answerDetailed,
    isUserDetailedLoaded,
    comments,
  }
}
