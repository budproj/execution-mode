// Temp import { Collapse, IconButton, Skeleton, Stack } from '@chakra-ui/react'
import { Skeleton, Stack } from '@chakra-ui/react'
// Temp import React, { useState } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

// Temp import ChevronDownIcon from 'src/components/Icon/ChevronDown'
import { PercentageNumberMask } from 'src/components/KeyResult/NumberMasks'
import ProgressSlider from 'src/components/KeyResult/ProgressSlider/wrapper'
// Temp import { EventType } from 'src/state/hooks/useEvent/event-type'
// Temp import { useEvent } from 'src/state/hooks/useEvent/hook'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import { KeyResultSectionHeading } from '../Heading/wrapper'
// Temp import { ProgressHistoryChart } from '../ProgressHistory/wrapper'

import messages from './messages'

type KeyResultProgressProperties = {
  keyResultID?: string
}

export const KeyResultProgress = ({ keyResultID }: KeyResultProgressProperties) => {
  const intl = useIntl()
  // Temp const [isGraphOpen, setIsGraphOpen] = useState(false)
  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))
  // Temp const { dispatch } = useEvent(EventType.KEY_RESULT_PROGRESS_CHART_VIEW)

  const isLoaded = Boolean(keyResult)
  const isActive = keyResult?.status?.isActive
  /* Temp
  const handleGraphToggle = () => {
    setIsGraphOpen(!isGraphOpen)

    if (!isGraphOpen && keyResultID) dispatch({ keyResultID })
  }
  */
  return (
    <>
      <Stack spacing={4} direction="row" alignItems="center">
        <KeyResultSectionHeading>{intl.formatMessage(messages.heading)}</KeyResultSectionHeading>

        <Skeleton isLoaded={isLoaded} flexGrow={1} display="flex">
          <ProgressSlider isDisabled id={keyResult?.id} isActive={isActive} />
        </Skeleton>

        <Skeleton noOfLines={1} isLoaded={isLoaded} color="gray.400" fontWeight={700}>
          <PercentageNumberMask
            value={keyResult?.status?.progress}
            displayType="text"
            decimalScale={0}
          />
        </Skeleton>
        {/*   Temp
        <IconButton
          color="new-gray.900"
          minW="auto"
          h="auto"
          aria-label={intl.formatMessage(messages.openGraphIconDesc)}
          icon={
            <ChevronDownIcon
              fill="currentColor"
              desc={intl.formatMessage(messages.openGraphIconDesc)}
              transition="transform 0.3s ease-in-out"
              transform={isGraphOpen ? 'rotate(180deg)' : '0'}
            />
          }
          onClick={handleGraphToggle}
        
        />  */}
      </Stack>
      {/*  Temp
      <Collapse in={isGraphOpen}>
        <ProgressHistoryChart keyResultID={keyResultID} />
      </Collapse>
        */}
    </>
  )
}
