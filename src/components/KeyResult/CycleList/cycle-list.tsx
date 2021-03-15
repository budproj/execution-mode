import { Heading, Skeleton, Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { Cycle } from 'src/components/Cycle/types'
import { KeyResult } from 'src/components/KeyResult/types'
import useCadence from 'src/state/hooks/useCadence'
import { cycleAtomFamily } from 'src/state/recoil/cycle'

import KeyResultList from '../List'
import { KEY_RESULT_LIST_COLUMN } from '../List/Body/Columns/constants'
import { KEY_RESULT_LIST_TYPE } from '../List/constants'

import messages from './messages'

export interface KeyResultCycleListProperties {
  id?: Cycle['id']
  onLineClick?: (id: KeyResult['id']) => void
}

const KeyResultCycleList = ({ id, onLineClick }: KeyResultCycleListProperties) => {
  const cycle = useRecoilValue(cycleAtomFamily(id))
  const [cadence, setCadenceValue] = useCadence(cycle?.cadence)
  const intl = useIntl()

  const isLoaded = Boolean(cycle)
  const keyResultIDs = cycle?.keyResults?.map((keyResult) => keyResult.id)

  useEffect(() => {
    if (cycle?.cadence) setCadenceValue(cycle?.cadence)
  }, [cycle?.cadence, setCadenceValue])

  return (
    <Stack direction="column" gridGap={4}>
      <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 300, 21)}>
        <Heading as="h2" fontSize="md" color="gray.500" fontWeight={700} textTransform="uppercase">
          {intl.formatMessage(messages.title, {
            prefix: cadence.prefix,
            cycle: cycle?.title,
          })}
        </Heading>
      </Skeleton>

      <KeyResultList
        type={KEY_RESULT_LIST_TYPE.STATIC}
        keyResultIDs={keyResultIDs}
        isLoading={!isLoaded}
        templateColumns="7fr 6fr 4fr 6fr 1fr 2fr"
        columns={[
          KEY_RESULT_LIST_COLUMN.KEY_RESULT,
          KEY_RESULT_LIST_COLUMN.OBJECTIVE,
          KEY_RESULT_LIST_COLUMN.CONFIDENCE_LEVEL,
          KEY_RESULT_LIST_COLUMN.PROGRESS,
          KEY_RESULT_LIST_COLUMN.PERCENTUAL_PROGRESS,
          KEY_RESULT_LIST_COLUMN.OWNER,
        ]}
        headProperties={{
          [KEY_RESULT_LIST_COLUMN.OWNER]: {
            justifySelf: 'flex-end',
          },
        }}
        bodyProperties={{
          [KEY_RESULT_LIST_COLUMN.KEY_RESULT]: {
            withDynamicIcon: true,
            withRightBorder: true,
            withLastUpdateInfo: true,
          },
          [KEY_RESULT_LIST_COLUMN.PROGRESS]: {
            canChange: true,
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

export default KeyResultCycleList
