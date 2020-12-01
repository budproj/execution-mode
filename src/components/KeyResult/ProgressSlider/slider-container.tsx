import React, { forwardRef, useCallback } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { Slider } from 'src/components/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import {
  keyResultProgressUpdatePopoverSlider,
  keyResultProgressUpdateCurrentProgress as selectCurrentProgress,
  keyResultProgressUpdateStep as selectStep,
} from 'src/state/recoil/key-result/progress-update'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'
import confidenceTagSelector from 'src/state/recoil/key-result/selectors/confidence-tag'

export interface ProgressSliderContainerProperties {
  keyResultID?: KeyResult['id']
}

const initialValueSelector = buildPartialSelector<KeyResult['initialValue']>('initialValue')
const goalSelector = buildPartialSelector<KeyResult['goal']>('goal')

const ProgressSliderContainer = forwardRef<HTMLDivElement, ProgressSliderContainerProperties>(
  ({ keyResultID }: ProgressSliderContainerProperties, forwardedReference) => {
    const [currentProgress, setCurrentProgress] = useRecoilState(selectCurrentProgress(keyResultID))
    const confidenceTag = useRecoilValue(confidenceTagSelector(keyResultID))
    const initialValue = useRecoilValue(initialValueSelector(keyResultID))
    const goal = useRecoilValue(goalSelector(keyResultID))
    const step = useRecoilValue(selectStep(keyResultID))
    const setOpenedPopover = useSetRecoilState(keyResultProgressUpdatePopoverSlider)

    const isLoaded = Boolean(goal)

    const handleSliderUpdate = useCallback(
      (valueNew?: number): void => {
        if (valueNew) setCurrentProgress(valueNew)
      },
      [setCurrentProgress],
    )

    const handleSliderUpdateEnd = useCallback(
      (newValue: number | number[]) => {
        if (newValue) setOpenedPopover(keyResultID)
      },
      [keyResultID, setOpenedPopover],
    )

    return (
      <Slider
        ref={forwardedReference}
        value={currentProgress}
        trackColor={confidenceTag?.color}
        min={initialValue as KeyResult['initialValue']}
        max={goal as KeyResult['goal']}
        step={step}
        isDisabled={!isLoaded}
        onChange={handleSliderUpdate}
        onChangeEnd={handleSliderUpdateEnd}
      />
    )
  },
)

export default ProgressSliderContainer
