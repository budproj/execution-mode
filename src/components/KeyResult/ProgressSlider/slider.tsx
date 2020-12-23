import React, { RefObject, forwardRef, useCallback, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import Slider, { SliderProperties } from 'src/components/Base/Slider'
import { KeyResult } from 'src/components/KeyResult/types'
import {
  keyResultProgressUpdatePopoverOpen,
  keyResultProgressUpdateDraftValue as draftValueAtom,
  keyResultProgressUpdateStep as selectStep,
} from 'src/state/recoil/key-result/progress-update'
import {
  buildPartialSelector,
  selectCurrentConfidence,
} from 'src/state/recoil/key-result/selectors'
import confidenceTagSelector from 'src/state/recoil/key-result/selectors/confidence-tag'

export interface ProgressSliderContainerProperties {
  keyResultID?: KeyResult['id']
}

const initialValueSelector = buildPartialSelector<KeyResult['initialValue']>('initialValue')
const goalSelector = buildPartialSelector<KeyResult['goal']>('goal')

const ProgressSlider = forwardRef(
  (
    properties: SliderProperties,
    reference?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null,
  ) => <Slider {...properties} ref={reference} />,
)

const ProgressSliderContainer = forwardRef<HTMLDivElement, ProgressSliderContainerProperties>(
  ({ keyResultID }: ProgressSliderContainerProperties, forwardedReference) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isChanging, setIsChanging] = useState(false)
    const [draftValue, setDraftValue] = useRecoilState(draftValueAtom(keyResultID))
    const currentConfidence = useRecoilValue(selectCurrentConfidence(keyResultID))
    const confidenceTag = useRecoilValue(confidenceTagSelector(currentConfidence))
    const initialValue = useRecoilValue(initialValueSelector(keyResultID))
    const goal = useRecoilValue(goalSelector(keyResultID))
    const step = useRecoilValue(selectStep(keyResultID))
    const setOpenedPopover = useSetRecoilState(keyResultProgressUpdatePopoverOpen(keyResultID))

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
        onChange={handleSliderUpdate}
        onChangeEnd={handleSliderUpdateEnd}
      />
    ) : (
      <Slider isDisabled />
    )
  },
)

export default ProgressSliderContainer
