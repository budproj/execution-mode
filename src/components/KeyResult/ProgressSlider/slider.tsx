import React, { RefObject, forwardRef, useCallback, useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import SliderWithHoverThumb, {
  SliderWithHoverThumbProperties,
} from 'src/components/Base/SliderWithHoverThumb'
import { KeyResult } from 'src/components/KeyResult/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import {
  keyResultCheckInIsSlidding,
  keyResultCheckInPopoverOpen,
  keyResultCheckInProgressDraft,
  keyResultCheckInProgressSliderStep,
  keyResultLatestCheckIn,
} from 'src/state/recoil/key-result/check-in'

import messages from './messages'

export interface ProgressSliderSliderProperties {
  keyResultID?: KeyResult['id']
  isDisabled?: boolean
  isActive?: boolean
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
  ({ keyResultID, isDisabled, isActive }: ProgressSliderSliderProperties, forwardedReference) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isChanging, setIsChanging] = useState(false)
    const [draftValue, setDraftValue] = useRecoilState(keyResultCheckInProgressDraft(keyResultID))
    const [isSlidding, setIsSlidding] = useRecoilState(keyResultCheckInIsSlidding(keyResultID))
    const latestKeyResultCheckIn = useRecoilValue(keyResultLatestCheckIn(keyResultID))
    const initialValue = useRecoilValue(initialValueSelector(keyResultID))
    const goal = useRecoilValue(goalSelector(keyResultID))
    const step = useRecoilValue(keyResultCheckInProgressSliderStep(keyResultID))
    const setOpenedPopover = useSetRecoilState(keyResultCheckInPopoverOpen(keyResultID))
    const [confidenceTag, setConfidenceInConfidenceTag] = useConfidenceTag(
      latestKeyResultCheckIn?.confidence,
    )
    const intl = useIntl()

    const handleSliderUpdate = useCallback(
      (valueNew?: number): void => {
        if (valueNew) {
          setDraftValue(valueNew)
          setIsChanging(true)
        }

        if (!isSlidding) setIsSlidding(true)
      },
      [setDraftValue, setIsChanging, isSlidding, setIsSlidding],
    )

    const handleSliderUpdateEnd = useCallback(
      (newValue: number | number[]) => {
        if (isChanging && newValue && newValue === draftValue) {
          setOpenedPopover(true)
          setIsChanging(false)
        }

        if (isSlidding) setIsSlidding(false)
      },
      [draftValue, isChanging, setOpenedPopover, setIsChanging, isSlidding, setIsSlidding],
    )

    if (!isLoaded && typeof goal !== 'undefined') setIsLoaded(true)

    useEffect(() => {
      if (latestKeyResultCheckIn?.confidence)
        setConfidenceInConfidenceTag(latestKeyResultCheckIn?.confidence)
    }, [latestKeyResultCheckIn?.confidence, setConfidenceInConfidenceTag])

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
        trackColor={isActive ? confidenceTag?.color.primary : 'black.400'}
        min={initialValue as KeyResult['initialValue']}
        max={goal as KeyResult['goal']}
        step={step}
        focusThumbOnChange={false}
        isDisabled={isDisabled}
        thumbTooltipLabel={intl.formatMessage(messages.thumbTooltip)}
        onChange={handleSliderUpdate}
        onChangeEnd={handleSliderUpdateEnd}
      />
    ) : (
      <SliderWithHoverThumb isDisabled />
    )
  },
)

export default ProgressSliderSlider
