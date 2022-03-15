import { Flex, Box, Text, Skeleton, SkeletonText, useToken } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import LastUpdateText from 'src/components/Base/LastUpdateText'
import { Check, Clock } from 'src/components/Icon'
import KeyResultDynamicIcon from 'src/components/KeyResult/DynamicIcon'
import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import selectLatestCheckIn from 'src/state/recoil/key-result/check-in/latest'

import messages from './messages'

export interface KeyResultListBodyColumnKeyResultProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
  withRightBorder?: boolean
  withDynamicIcon?: boolean
  withLastUpdateInfo?: boolean
  isDisabled?: boolean
}

const titleSelector = buildPartialSelector<KeyResult['title']>('title')
const statusSelector = buildPartialSelector<KeyResult['status']>('status')

const KeyResultListBodyColumnKeyResult = ({
  id,
  borderColor,
  withRightBorder,
  withDynamicIcon,
  withLastUpdateInfo,
  isDisabled,
}: KeyResultListBodyColumnKeyResultProperties): ReactElement => {
  const title = useRecoilValue(titleSelector(id))
  const status = useRecoilValue(statusSelector(id))
  const latestCheckIn = useRecoilValue(selectLatestCheckIn(id))
  const intl = useIntl()

  const isKeyResultLoaded = Boolean(title)
  const lastUpdateDate = latestCheckIn?.createdAt ? new Date(latestCheckIn.createdAt) : undefined
  const updateTextColor = status?.isOutdated && !isDisabled ? 'red.500' : 'gray.300'
  const [updateTextColorToken] = useToken('colors', [updateTextColor])
  const prefixMessage = status?.isOutdated
    ? messages.outdatedUpdateTextPrefix
    : messages.lastUpdateTextPrefix

  return (
    <KeyResultListBodyColumnBase
      borderRight={withRightBorder ? 1 : 0}
      borderColor={borderColor}
      borderStyle="solid"
      pr={2}
      h="full"
      alignItems="center"
      display="flex"
      minWidth="320px"
    >
      <Flex gridGap={4} alignItems="center">
        {withDynamicIcon && (
          <Skeleton borderRadius={10} isLoaded={isKeyResultLoaded}>
            <KeyResultDynamicIcon title={title} isDisabled={isDisabled} />
          </Skeleton>
        )}

        <Box>
          <Skeleton isLoaded={isKeyResultLoaded}>
            <Text color="black.900">{title ?? 'This is a sample KR title'}</Text>
          </Skeleton>

          {withLastUpdateInfo && (
            <SkeletonText
              noOfLines={2}
              minW="100%"
              mt={isKeyResultLoaded ? 'inherit' : '4px'}
              isLoaded={isKeyResultLoaded}
            >
              <Flex alignItems="center">
                {status?.isOutdated ? (
                  <Clock
                    desc={intl.formatMessage(messages.outdatedUpdateIconDescription)}
                    width="12px"
                    height="12px"
                    fill="transparent"
                    stroke={updateTextColorToken}
                    mr={1}
                  />
                ) : (
                  <Check
                    desc={intl.formatMessage(messages.upToDateUpdateIconDescription)}
                    fill={updateTextColorToken}
                  />
                )}
                <LastUpdateText
                  date={lastUpdateDate}
                  color={updateTextColor}
                  prefix={intl.formatMessage(prefixMessage)}
                />
              </Flex>
            </SkeletonText>
          )}
        </Box>
      </Flex>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnKeyResult
