import React, { ForwardedRef } from 'react'

import Slider from 'components/Base/Slider'
import { SliderProperties } from 'components/Base/Slider/slider'
import { selectConfidenceTag } from 'components/KeyResult/ConfidenceTag/selectors'
import { KeyResult, ProgressReport, ConfidenceReport } from 'components/KeyResult/types'

import { selectProgressStep } from './selectors'

export interface ProgressSliderComponentProperties extends SliderProperties {
  initialValue: KeyResult['initialValue']
  goal: KeyResult['goal']
  latestProgressReport?: ProgressReport
  latestConfidenceReport?: ConfidenceReport
  format?: KeyResult['format']
  forwardedReference: ForwardedRef<HTMLDivElement>
}

const ProgressSliderComponent = ({
  latestProgressReport,
  latestConfidenceReport,
  initialValue,
  goal,
  format,
  forwardedReference,
  ...rest
}: ProgressSliderComponentProperties) => {
  const currentProgress = latestProgressReport?.valueNew ?? 0
  const currentConfidence = latestConfidenceReport?.valueNew ?? 50

  const { color } = selectConfidenceTag(currentConfidence)
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
