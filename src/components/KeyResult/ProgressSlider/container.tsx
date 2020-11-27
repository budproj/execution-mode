import { remove } from 'lodash'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { Slider } from 'components/Base'
import { KeyResult, ProgressReport } from 'components/KeyResult/types'
import { buildPartialSelector } from 'state/recoil/key-result'

import ProgressSliderComponent from './component'

export interface ProgressSliderContainerProperties {
  id?: KeyResult['id']
  isPopoverGuarded?: boolean
}

const initialValueSelector = buildPartialSelector<KeyResult['initialValue']>('initialValue')
const goalSelector = buildPartialSelector<KeyResult['goal']>('goal')
const formatSelector = buildPartialSelector<KeyResult['format']>('format')
const progressReportsSelector = buildPartialSelector<KeyResult['progressReports']>(
  'progressReports',
)
const confidenceReportsSelector = buildPartialSelector<KeyResult['confidenceReports']>(
  'confidenceReports',
)

const ProgressSliderContainer = ({ id, isPopoverGuarded }: ProgressSliderContainerProperties) => {
  const [progressReports, setProgressReports] = useRecoilState(progressReportsSelector(id))
  const confidenceReports = useRecoilValue(confidenceReportsSelector(id))
  const initialValue = useRecoilValue(initialValueSelector(id))
  const goal = useRecoilValue(goalSelector(id))
  const format = useRecoilValue(formatSelector(id))

  const isLoaded = Boolean(goal)

  const handleSliderUpdate = (valueNew?: number): void => {
    if (valueNew) {
      const previousReport = progressReports?.[0]
      const newLocalReport = {
        valueNew,
        valuePrevious: previousReport?.valueNew,
      }

      setProgressReports(remove([newLocalReport as ProgressReport, ...(progressReports ?? [])]))
    }
  }

  const handleSliderUpdateEnd = (newValue: number | number[]) => {
    console.log('ok')
    const newKeyResultPartial = { progress: newValue as number, id }
    // Await updateRemoteKeyResult(id, newKeyResultPartial)
  }

  return isLoaded ? (
    <ProgressSliderComponent
      isPopoverGuarded={isPopoverGuarded}
      latestProgressReport={progressReports?.[0]}
      latestConfidenceReport={confidenceReports?.[0]}
      initialValue={initialValue as KeyResult['initialValue']}
      goal={goal as KeyResult['goal']}
      format={format}
      handleSliderUpdate={handleSliderUpdate}
      handleSliderUpdateEnd={handleSliderUpdateEnd}
    />
  ) : (
    <Slider isDisabled />
  )
}

export default ProgressSliderContainer
