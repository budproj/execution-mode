import { Heading, Stack, Skeleton } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { Cycle } from 'src/components/Cycle/types'
import useCadence from 'src/state/hooks/useCadence'

import KeyResultList from '../List'
import { KEY_RESULT_LIST_COLUMN } from '../List/Body/Columns/constants'
import { KEY_RESULT_LIST_TYPE } from '../List/constants'

import messages from './messages'

type CycleKeyResultListProperties = {
  cycle?: Partial<Cycle>
  keyResultIDs?: string[]
  isLoaded?: boolean
  isDisabled?: boolean
  isActive?: boolean
  onLineClick?: (id: string) => void
}

export const CycleKeyResultList = ({
  isLoaded,
  cycle,
  keyResultIDs,
  isActive,
  isDisabled,
  onLineClick,
}: CycleKeyResultListProperties) => {
  const intl = useIntl()
  const [cadence, setCadenceValue] = useCadence(cycle?.cadence)

  useEffect(() => {
    if (cycle?.cadence) setCadenceValue(cycle?.cadence)
  }, [cycle?.cadence, setCadenceValue])

  return (
    <Stack direction="column" gridGap={8}>
      <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded ?? true, 300, 21)}>
        <Heading
          as="h2"
          fontSize="xl"
          color="new-gray.800"
          fontWeight="bold"
          textTransform="uppercase"
        >
          {intl
            .formatMessage(messages.title, {
              prefix: cadence.prefix,
              cycle: cycle?.period,
              suffix: cycle?.parent?.period,
            })
            .trim()}
        </Heading>
      </Skeleton>

      <KeyResultList
        type={KEY_RESULT_LIST_TYPE.STATIC}
        keyResultIDs={keyResultIDs}
        isLoading={!isLoaded}
        templateColumns="2fr 1fr 80px"
        borderColor="new-gray.400"
        mt="-0.8rem !important"
        headProperties={{
          [KEY_RESULT_LIST_COLUMN.KEY_RESULT]: {
            hidden: true,
          },
          [KEY_RESULT_LIST_COLUMN.PROGRESS]: {
            hidden: true,
          },
          [KEY_RESULT_LIST_COLUMN.OWNER]: {
            hidden: true,
          },
        }}
        columns={[
          KEY_RESULT_LIST_COLUMN.KEY_RESULT,
          KEY_RESULT_LIST_COLUMN.PROGRESS,
          KEY_RESULT_LIST_COLUMN.OWNER,
        ]}
        bodyProperties={{
          [KEY_RESULT_LIST_COLUMN.KEY_RESULT]: {
            withDynamicIcon: true,
            withLastUpdateInfo: true,
            isDisabled,
          },
          [KEY_RESULT_LIST_COLUMN.PROGRESS]: {
            isActive,
            isDisabled,
            withConfidenceTag: true,
          },
          [KEY_RESULT_LIST_COLUMN.OWNER]: {
            justifyContent: 'flex-end',
          },
        }}
        onLineClick={onLineClick}
      />
    </Stack>
  )
}
