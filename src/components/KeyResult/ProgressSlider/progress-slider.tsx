import remove from 'lodash/remove'
import React, { ReactElement } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import Slider from 'components/Base/Slider'
import { selectConfidenceTag } from 'components/KeyResult/ConfidenceTag/selectors'
import { KeyResult, ProgressReport } from 'components/KeyResult/types'
import { buildPartialSelector } from 'state/recoil/key-result'

import { selectProgressStep } from './selectors'

export interface ProgressSliderProperties {
  id?: KeyResult['id']
}

const initialValueSelector = buildPartialSelector<KeyResult['initialValue']>('initialValue')
const goalSelector = buildPartialSelector<KeyResult['goal']>('goal')
const progressReportsSelector = buildPartialSelector<KeyResult['progressReports']>(
  'progressReports',
)
const confidenceReportsSelector = buildPartialSelector<KeyResult['confidenceReports']>(
  'confidenceReports',
)

const ProgressSlider = ({ id }: ProgressSliderProperties): ReactElement => {
  const [progressReports, setProgressReports] = useRecoilState(progressReportsSelector(id))
  const confidenceReports = useRecoilValue(confidenceReportsSelector(id))
  const initialValue = useRecoilValue(initialValueSelector(id))
  const goal = useRecoilValue(goalSelector(id))

  const latestProgressReport = progressReports?.[0]
  const latestConfidenceReport = confidenceReports?.[0]
  const currentProgress = latestProgressReport?.valueNew ?? 0
  const currentConfidence = latestConfidenceReport?.valueNew ?? 50

  const { color } = selectConfidenceTag(currentConfidence)
  const step = selectProgressStep(initialValue, goal)

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

  const handleSliderUpdateEnd = async (newValue: number | number[]): Promise<number | number[]> => {
    if (newValue === currentProgress) return currentProgress

    const newKeyResultPartial = { progress: newValue as number, id }
    console.log('NAH')
    return newValue
    // Await updateRemoteKeyResult(id, newKeyResultPartial)
  }

  return (
    <Slider
      value={currentProgress}
      trackColor={color}
      min={initialValue}
      max={goal}
      step={step}
      onChange={handleSliderUpdate}
      onChangeEnd={handleSliderUpdateEnd}
    />
  )
}

export default ProgressSlider
