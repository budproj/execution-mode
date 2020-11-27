import React from 'react'

import Slider from 'components/Base/Slider'
import { SliderProperties } from 'components/Base/Slider/slider'
import { selectConfidenceTag } from 'components/KeyResult/ConfidenceTag/selectors'
import { KeyResult, ProgressReport } from 'components/KeyResult/types'

import { ConfidenceReport } from '..'

import PopoverGuard from './popover-guard'
import { selectProgressStep } from './selectors'

export interface ProgressSliderComponentProperties {
  initialValue: KeyResult['initialValue']
  goal: KeyResult['goal']
  handleSliderUpdate: SliderProperties['onChange']
  handleSliderUpdateEnd: SliderProperties['onChangeEnd']
  isPopoverGuarded?: boolean
  latestProgressReport?: ProgressReport
  latestConfidenceReport?: ConfidenceReport
  format?: KeyResult['format']
}

const ProgressSlider = ({
  latestProgressReport,
  latestConfidenceReport,
  initialValue,
  goal,
  format,
  handleSliderUpdate,
  handleSliderUpdateEnd,
  isPopoverGuarded,
}: ProgressSliderComponentProperties) => {
  const currentProgress = latestProgressReport?.valueNew ?? 0
  const currentConfidence = latestConfidenceReport?.valueNew ?? 50

  const { color } = selectConfidenceTag(currentConfidence)
  const step = selectProgressStep(format)

  return isPopoverGuarded ? (
    <PopoverGuard
      Slider={Slider}
      value={currentProgress}
      trackColor={color}
      min={initialValue}
      max={goal}
      step={step}
      onChange={handleSliderUpdate}
      onChangeEnd={handleSliderUpdateEnd}
    />
  ) : (
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
