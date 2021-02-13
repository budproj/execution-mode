import React, { RefObject, forwardRef, useCallback, useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import SliderWithHoverThumb, {
  SliderWithHoverThumbProperties,
} from 'src/components/Base/SliderWithHoverThumb'
import { KeyResult } from 'src/components/KeyResult/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import {
  keyResultCheckInPopoverOpen,
  keyResultCheckInProgressDraft,
  keyResultCheckInProgressSliderStep,
} from 'src/state/recoil/key-result/check-in'
import selectCurrentConfidence from 'src/state/recoil/key-result/current-confidence'

export interface ProgressSliderSliderProperties {
  keyResultID?: KeyResult['id']
  canChange?: boolean
}

const initialValueSelector = buildPartialSelector<KeyResult['initialValue']>('initialValue')
const goalSelector = buildPartialSelector<KeyResult['goal']>('goal')

const ProgressSliderSliderWithReference = forwardRef(
  (
    properties: SliderWithHoverThumbProperties,
    reference?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null,
  ) => <SliderWithHoverThumb {...properties} ref={reference} dataAction="open-check-in" />,
)

const ProgressSliderSlider = forwardRef<HTMLDivElement, ProgressSliderSliderProperties>(
  ({ keyResultID, canChange }: ProgressSliderSliderProperties, forwardedReference) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isChanging, setIsChanging] = useState(false)
    const [draftValue, setDraftValue] = useRecoilState(keyResultCheckInProgressDraft(keyResultID))
    const currentConfidence = useRecoilValue(selectCurrentConfidence(keyResultID))
    const initialValue = useRecoilValue(initialValueSelector(keyResultID))
    const goal = useRecoilValue(goalSelector(keyResultID))
    const step = useRecoilValue(keyResultCheckInProgressSliderStep(keyResultID))
    const setOpenedPopover = useSetRecoilState(keyResultCheckInPopoverOpen(keyResultID))
    const [confidenceTag, setConfidenceInConfidenceTag] = useConfidenceTag(currentConfidence)

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

    useEffect(() => {
      if (currentConfidence) setConfidenceInConfidenceTag(currentConfidence)
    }, [currentConfidence, setConfidenceInConfidenceTag])

    // Since Chakra use only hooks to handle lifecycles, it does not behaves well in their
    // onChange events. Even if we provide the isDisabled tag to it, it dispatches the onChange and
    // onChangeEnd events as soon as you pass an defined value. That triggers all the popovers to
    // appears (since our applications understands that the slider was updates upon mounting).
    // To prevent that I've added that dumb componen called ProgressSliderSlider, that simples behaves
    // as a different node in our tree and allow us to avoid that behaviour.
    return isLoaded ? (
      <ProgressSliderSliderWithReference
        ref={forwardedReference}
        value={draftValue}
        trackColor={confidenceTag?.color.primary}
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

export default ProgressSliderSlider
