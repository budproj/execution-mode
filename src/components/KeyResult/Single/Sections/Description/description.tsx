import { Flex, SkeletonText, Heading } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { ExpandableText } from 'src/components/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

import messages from './messages'

export interface KeyResultSectionDescriptionProperties {
  keyResultID?: KeyResult['id']
  isLoading?: boolean
}

const descriptionSelector = buildPartialSelector<KeyResult['description']>('description')

const KeyResultSectionDescription = ({
  keyResultID,
  isLoading,
}: KeyResultSectionDescriptionProperties) => {
  const intl = useIntl()
  const description = useRecoilValue(descriptionSelector(keyResultID))

  const hasData = typeof description !== 'undefined'
  isLoading ??= hasData

  return (
    (hasData || isLoading) && (
      <Flex gridGap={2} direction="column">
        <Heading as="h3" fontWeight={700} color="gray.500" fontSize="xs" textTransform="uppercase">
          {intl.formatMessage(messages.label)}
        </Heading>
        <Flex alignItems="center" gridGap={2}>
          <SkeletonText isLoaded={!isLoading} noOfLines={5} spacing={2} w="100%">
            <ExpandableText fontSize="md" color="black.800" text={description} />
          </SkeletonText>
        </Flex>
      </Flex>
    )
  )
}

export default KeyResultSectionDescription
