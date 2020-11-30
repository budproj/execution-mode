import React, { forwardRef, useCallback } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { Slider } from 'src/components/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result'
import {
  keyResultProgressUpdatePopoverSlider,
  keyResultProgressUpdateCurrentProgress as selectCurrentProgress,
  keyResultProgressUpdateCurrentConfidence as selectCurrentConfidence,
} from 'src/state/recoil/key-result/progress-update'

import ProgressSliderComponent from './slider-component'

export interface ProgressSliderContainerProperties {
  keyResultID?: KeyResult['id']
}

const initialValueSelector = buildPartialSelector<KeyResult['initialValue']>('initialValue')
const goalSelector = buildPartialSelector<KeyResult['goal']>('goal')
const formatSelector = buildPartialSelector<KeyResult['format']>('format')

const ProgressSliderContainer = forwardRef<HTMLDivElement, ProgressSliderContainerProperties>(
  ({ keyResultID }: ProgressSliderContainerProperties, forwardedReference) => {
    const [currentProgress, setCurrentProgress] = useRecoilState(selectCurrentProgress(keyResultID))
    const currentConfidence = useRecoilValue(selectCurrentConfidence(keyResultID))
    const initialValue = useRecoilValue(initialValueSelector(keyResultID))
    const goal = useRecoilValue(goalSelector(keyResultID))
    const format = useRecoilValue(formatSelector(keyResultID))
    const setOpenedPopover = useSetRecoilState(keyResultProgressUpdatePopoverSlider)

    const isLoaded = Boolean(goal)

    const handleSlkeyResultIDerUpdate = useCallback(
      (valueNew?: number): void => {
        if (valueNew) setCurrentProgress(valueNew)
      },
      [setCurrentProgress],
    )

    const handleSlkeyResultIDerUpdateEnd = useCallback(
      (newValue: number | number[]) => {
        setOpenedPopover(keyResultID)
        console.log('ok')
        // Console.log('ok')
        // const newKeyResultPartial = { progress: newValue as number, keyResultID }
        // Await updateRemoteKeyResult(keyResultID, newKeyResultPartial)
      },
      [keyResultID, setOpenedPopover],
    )

    return isLoaded ? (
      <ProgressSliderComponent
        currentProgress={currentProgress}
        currentConfidence={currentConfidence}
        initialValue={initialValue as KeyResult['initialValue']}
        goal={goal as KeyResult['goal']}
        format={format}
        forwardedReference={forwardedReference}
        onChange={handleSlkeyResultIDerUpdate}
        onChangeEnd={handleSlkeyResultIDerUpdateEnd}
      />
    ) : (
      <Slider isDisabled />
    )
  },
)

export default ProgressSliderContainer
