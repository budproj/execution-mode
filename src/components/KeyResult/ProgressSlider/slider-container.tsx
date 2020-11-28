import { remove } from 'lodash'
import React, { forwardRef, useCallback } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { Slider } from 'components/Base'
import { KeyResult, ProgressReport } from 'components/KeyResult/types'
import { buildPartialSelector } from 'state/recoil/key-result'
import { keyResultProgressUpdatePopoverAtom } from 'state/recoil/key-result/progress-update'

import ProgressSliderComponent from './slider-component'

export interface ProgressSliderContainerProperties {
  keyResultID?: KeyResult['id']
}

const initialValueSelector = buildPartialSelector<KeyResult['initialValue']>('initialValue')
const goalSelector = buildPartialSelector<KeyResult['goal']>('goal')
const formatSelector = buildPartialSelector<KeyResult['format']>('format')
const progressReportsSelector = buildPartialSelector<KeyResult['progressReports']>(
  'progressReports',
)
const confidenceReportsSelector = buildPartialSelector<KeyResult['confidenceReports']>(
  'confidenceReports',
)

const ProgressSliderContainer = forwardRef<HTMLDivElement, ProgressSliderContainerProperties>(
  ({ keyResultID }: ProgressSliderContainerProperties, forwardedReference) => {
    const [progressReports, setProgressReports] = useRecoilState(
      progressReportsSelector(keyResultID),
    )
    const confkeyResultIDenceReports = useRecoilValue(confidenceReportsSelector(keyResultID))
    const initialValue = useRecoilValue(initialValueSelector(keyResultID))
    const goal = useRecoilValue(goalSelector(keyResultID))
    const format = useRecoilValue(formatSelector(keyResultID))
    const setOpenedPopover = useSetRecoilState(keyResultProgressUpdatePopoverAtom)

    const isLoaded = Boolean(goal)

    const handleSlkeyResultIDerUpdate = useCallback(
      (valueNew?: number): void => {
        if (valueNew) {
          const previousReport = progressReports?.[0]
          const newLocalReport = {
            valueNew,
            valuePrevious: previousReport?.valueNew,
          }

          setProgressReports(remove([newLocalReport as ProgressReport, ...(progressReports ?? [])]))
        }
      },
      [progressReports, setProgressReports],
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
        latestProgressReport={progressReports?.[0]}
        latestConfidenceReport={confkeyResultIDenceReports?.[0]}
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
