import { Flex, Skeleton, SkeletonText, Stack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import EditableInputValue from 'src/components/Base/EditableInputValue'
import LastUpdateText from 'src/components/Base/LastUpdateText'
import { KeyResultDynamicIcon } from 'src/components/KeyResult'
import { KeyResult } from 'src/components/KeyResult/types'
import { GraphQLEffect } from 'src/components/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import selectLatestCheckIn from 'src/state/recoil/key-result/check-in/latest'

import messages from './messages'

export interface KeyResultSectionTitleProperties {
  keyResultID?: KeyResult['id']
}

const KeyResultSectionTitle = ({ keyResultID }: KeyResultSectionTitleProperties) => {
  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))
  const latestCheckIn = useRecoilValue(selectLatestCheckIn(keyResultID))
  const intl = useIntl()

  const isLoaded = Boolean(keyResult)
  const lastUpdateDate = latestCheckIn?.createdAt ? new Date(latestCheckIn.createdAt) : undefined

  return (
    <Flex gridGap={4} alignItems="flex-start">
      <Skeleton borderRadius={10} isLoaded={isLoaded}>
        <KeyResultDynamicIcon title={keyResult?.title} iconSize={4} boxSize={10} borderRadius={8} />
      </Skeleton>

      <Stack spacing={2} flexGrow={1}>
        <Skeleton isLoaded={isLoaded}>
          <EditableInputValue
            value={keyResult?.title}
            isLoaded={isLoaded}
            isSubmitting={false}
            isDisabled={keyResult?.policy?.update !== GraphQLEffect.ALLOW}
            maxCharacters={120}
            previewProperties={{
              fontSize: 'xl',
              fontWeight: 700,
              p: 0,
              as: 'h1',
            }}
            onSubmit={(value: string) => {
              console.log(value, 'tag')
            }}
          />
        </Skeleton>

        <SkeletonText
          noOfLines={2}
          minW="100%"
          mt={isLoaded ? 'inherit' : '4px'}
          isLoaded={isLoaded}
        >
          <LastUpdateText
            fontSize="sm"
            date={lastUpdateDate}
            color={keyResult?.isOutdated ? 'red.500' : 'gray.400'}
            prefix={intl.formatMessage(messages.lastUpdateTextPrefix)}
          />
        </SkeletonText>
      </Stack>
    </Flex>
  )
}

export default KeyResultSectionTitle
