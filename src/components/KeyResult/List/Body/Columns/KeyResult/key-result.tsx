import { Flex, Box, Text, Skeleton, SkeletonText } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { PercentageProgressIncreaseTag } from 'src/components/Base'
import LastUpdateText from 'src/components/Base/LastUpdateText'
import KeyResultDynamicIcon from 'src/components/KeyResult/DynamicIcon'
import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KEY_RESULT_MODE } from 'src/components/KeyResult/constants'
import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import selectLatestCheckIn from 'src/state/recoil/key-result/check-in/latest'

import { LastUpdateBadge } from './DraftMode/last-update-icon'
import messages from './messages'
import { UpdateIcon } from './update-icon'

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
const deltaSelector = buildPartialSelector<KeyResult['delta']>('delta')
const modeSelector = buildPartialSelector<KeyResult['mode']>('mode')

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
  const delta = useRecoilValue(deltaSelector(id))
  const mode = useRecoilValue(modeSelector(id))
  const intl = useIntl()

  const isKeyResultLoaded = Boolean(title)
  const lastUpdateDate = latestCheckIn?.createdAt ? new Date(latestCheckIn.createdAt) : undefined
  const updateTextColor = status?.isOutdated && !isDisabled ? 'red.500' : 'gray.300'
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
      minWidth="280px"
    >
      <Flex gridGap={4} alignItems="center">
        {withDynamicIcon && (
          <Skeleton borderRadius={10} position="relative" isLoaded={isKeyResultLoaded}>
            <KeyResultDynamicIcon title={title} isDisabled={isDisabled} mode={mode} />
            {delta && delta?.progress !== 0 && (
              <PercentageProgressIncreaseTag
                forcePositiveSignal
                showSignalArrow
                value={delta?.progress}
                fontSize="12px"
                fontWeight="medium"
                alignItems="center"
                justifyContent="center"
                display="flex"
                minWidth="100%"
                position="relative"
                border="1px solid"
                borderColor="white"
                left="50%"
                transform="translate(-50%, 25%)"
                padding={1}
                gridGap={0.5}
              />
            )}
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
              {mode === KEY_RESULT_MODE.DRAFT ? (
                <LastUpdateBadge lastUpdateDate={new Date()} />
              ) : (
                <Flex alignItems="center">
                  <UpdateIcon
                    isOutdated={status?.latestCheckIn ? status?.isOutdated : true}
                    updateTextColor={updateTextColor}
                  />
                  <LastUpdateText
                    date={lastUpdateDate}
                    color={updateTextColor}
                    prefix={intl.formatMessage(prefixMessage)}
                  />
                </Flex>
              )}
            </SkeletonText>
          )}
        </Box>
      </Flex>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnKeyResult
