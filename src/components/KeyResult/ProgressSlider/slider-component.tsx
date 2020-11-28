import React, { ForwardedRef } from 'react'

import Slider from 'components/Base/Slider'
import { SliderProperties } from 'components/Base/Slider/slider'
import { selectConfidenceTag } from 'components/KeyResult/ConfidenceTag/selectors'
import { KeyResult, ProgressReport, ConfidenceReport } from 'components/KeyResult/types'

import { selectProgressStep } from './selectors'

export interface ProgressSliderComponentProperties extends SliderProperties {
  initialValue: KeyResult['initialValue']
  goal: KeyResult['goal']
  currentProgress?: ProgressReport['valueNew']
  currentConfidence?: ConfidenceReport['valueNew']
  format?: KeyResult['format']
  forwardedReference: ForwardedRef<HTMLDivElement>
}

const ProgressSliderComponent = ({
  currentProgress,
  currentConfidence,
  initialValue,
  goal,
  format,
  forwardedReference,
  ...rest
}: ProgressSliderComponentProperties) => {
  const { color } = selectConfidenceTag(currentConfidence ?? 50)
  const step = selectProgressStep(format)

  return (
    <Slider
      ref={forwardedReference}
      value={currentProgress}
      trackColor={color}
      min={initialValue}
      max={goal}
      step={step}
      {...rest}
    />
  )
}

export default ProgressSliderComponent
