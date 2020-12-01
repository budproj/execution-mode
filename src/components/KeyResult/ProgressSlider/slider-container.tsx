import React, { ForwardedRef, forwardRef, useCallback, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import Slider, { SliderProperties } from 'src/components/Base/Slider'
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

const ProgressSlider = forwardRef(
  (properties: SliderProperties, reference: ForwardedRef<HTMLDivElement>) => (
    <Slider {...properties} ref={reference} />
  ),
)

const ProgressSliderContainer = forwardRef<HTMLDivElement, ProgressSliderContainerProperties>(
  ({ keyResultID }: ProgressSliderContainerProperties, forwardedReference) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [currentProgress, setCurrentProgress] = useRecoilState(selectCurrentProgress(keyResultID))
    const confidenceTag = useRecoilValue(confidenceTagSelector(keyResultID))
    const initialValue = useRecoilValue(initialValueSelector(keyResultID))
    const goal = useRecoilValue(goalSelector(keyResultID))
    const step = useRecoilValue(selectStep(keyResultID))
    const setOpenedPopover = useSetRecoilState(keyResultProgressUpdatePopoverSlider)

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

    if (!isLoaded && typeof goal !== 'undefined') setIsLoaded(true)

    // Since Chakra use only hooks to handle lifecycles, it does not behaves well in their
    // onChange events. Even if we provide the isDisabled tag to it, it dispatches the onChange and
    // onChangeEnd events as soon as you pass an defined value. That triggers all the popovers to
    // appears (since our applications understands that the slider was updates upon mounting).
    // To prevent that I've added that dumb componen called ProgressSlider, that simples behaves
    // as a different node in our tree and allow us to avoid that behaviour.
    return isLoaded ? (
      <ProgressSlider
        ref={forwardedReference}
        value={currentProgress}
        trackColor={confidenceTag?.color}
        min={initialValue as KeyResult['initialValue']}
        max={goal as KeyResult['goal']}
        step={step}
        focusThumbOnChange={false}
        onChange={handleSliderUpdate}
        onChangeEnd={handleSliderUpdateEnd}
      />
    ) : (
      <Slider isDisabled />
    )
  },
)

export default ProgressSliderContainer
