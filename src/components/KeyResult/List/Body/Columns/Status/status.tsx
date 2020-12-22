import { Flex, Text, Skeleton, SkeletonText } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import ConfidenceTag from 'src/components/KeyResult/ConfidenceTag/confidence-tag'
import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import messages from './messages'

export interface KeyResultListBodyColumnStatusProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
  withLastUpdateInfo?: boolean
}

const confidenceReportsSelector = buildPartialSelector<KeyResult['confidenceReports']>(
  'confidenceReports',
)

const KeyResultListBodyColumnStatus = ({
  id,
  withLastUpdateInfo,
}: KeyResultListBodyColumnStatusProperties): ReactElement => {
  const intl = useIntl()
  const latestConfidenceReport = useRecoilValue(confidenceReportsSelector(id))?.[0]
  const updateDate = latestConfidenceReport?.createdAt

  const isKeyResultLoaded = Boolean(id)

  return (
    <KeyResultListBodyColumnBase>
      <Flex gridGap={2} flexDir="column">
        <Skeleton
          isLoaded={isKeyResultLoaded}
          fadeDuration={0}
          /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
        >
          <ConfidenceTag confidenceValue={latestConfidenceReport?.valueNew} />
        </Skeleton>

        {withLastUpdateInfo && (
          <SkeletonText
            noOfLines={2}
            minW="100%"
            mt={isKeyResultLoaded ? 'inherit' : '4px'}
            isLoaded={isKeyResultLoaded}
            pl={8}
          >
            <Text color="gray.300" fontSize="14px">
              {intl.formatMessage(messages.updatedAt)} -{' '}
              {intl.formatDate(updateDate, {
                day: 'numeric',
                month: 'short',
              })}
            </Text>
          </SkeletonText>
        )}
      </Flex>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnStatus
