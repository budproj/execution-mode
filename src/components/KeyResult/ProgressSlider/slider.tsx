import React, { RefObject, forwardRef, useCallback, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import SliderWithHoverThumb, {
  SliderWithHoverThumbProperties,
} from 'src/components/Base/SliderWithHoverThumb'
import { KeyResult } from 'src/components/KeyResult/types'
import {
  keyResultCheckInPopoverOpen,
  keyResultCheckInProgressDraft,
  keyResultCheckInProgressSliderStep,
} from 'src/state/recoil/key-result/check-in'
import {
  buildPartialSelector,
  selectCurrentConfidence,
} from 'src/state/recoil/key-result/selectors'
import confidenceTagSelector from 'src/state/recoil/key-result/selectors/confidence-tag'

export interface ProgressSliderContainerProperties {
  keyResultID?: KeyResult['id']
  canChange?: boolean
}

const initialValueSelector = buildPartialSelector<KeyResult['initialValue']>('initialValue')
const goalSelector = buildPartialSelector<KeyResult['goal']>('goal')

const ProgressSlider = forwardRef(
  (
    properties: SliderWithHoverThumbProperties,
    reference?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null,
  ) => <SliderWithHoverThumb {...properties} ref={reference} />,
)

const ProgressSliderContainer = forwardRef<HTMLDivElement, ProgressSliderContainerProperties>(
  ({ keyResultID, canChange }: ProgressSliderContainerProperties, forwardedReference) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isChanging, setIsChanging] = useState(false)
    const [draftValue, setDraftValue] = useRecoilState(keyResultCheckInProgressDraft(keyResultID))
    const currentConfidence = useRecoilValue(selectCurrentConfidence(keyResultID))
    const confidenceTag = useRecoilValue(confidenceTagSelector(currentConfidence))
    const initialValue = useRecoilValue(initialValueSelector(keyResultID))
    const goal = useRecoilValue(goalSelector(keyResultID))
    const step = useRecoilValue(keyResultCheckInProgressSliderStep(keyResultID))
    const setOpenedPopover = useSetRecoilState(keyResultCheckInPopoverOpen(keyResultID))

    const handleSliderUpdate = useCallback(
      (valueNew?: number): void => {
        if (valueNew) {
          setDraftValue(valueNew)
          setIsChanging(true)
        }
      },
      [setDraftValue, setIsChanging],
    )

    const handleSliderUpdateEnd = useCallback(
      (newValue: number | number[]) => {
        if (isChanging && newValue && newValue === draftValue) {
          setOpenedPopover(true)
          setIsChanging(false)
        }
      },
      [draftValue, isChanging, setOpenedPopover, setIsChanging],
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
        value={draftValue}
        trackColor={confidenceTag?.color}
        min={initialValue as KeyResult['initialValue']}
        max={goal as KeyResult['goal']}
        step={step}
        focusThumbOnChange={false}
        isDisabled={!canChange}
        onChange={handleSliderUpdate}
        onChangeEnd={handleSliderUpdateEnd}
      />
    ) : (
      <SliderWithHoverThumb isDisabled />
    )
  },
)

export default ProgressSliderContainer
