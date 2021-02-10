import { Flex, Text, SkeletonText } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

import messages from './messages'

export interface KeyResultSectionDescriptionProperties {
  keyResultID?: KeyResult['id']
}

const descriptionSelector = buildPartialSelector<KeyResult['description']>('description')

const KeyResultSectionDescription = ({ keyResultID }: KeyResultSectionDescriptionProperties) => {
  const intl = useIntl()
  const description = useRecoilValue(descriptionSelector(keyResultID))

  const isDescriptionLoaded = typeof description !== 'undefined'

  return (
    <Flex gridGap={2} direction="column">
      <Text fontWeight={500} color="gray.600">
        {intl.formatMessage(messages.label)}
      </Text>
      <Flex alignItems="center" gridGap={2}>
        <SkeletonText isLoaded={isDescriptionLoaded} noOfLines={5} spacing={4} w="100%">
          <Text color="gray.500">{description}</Text>
        </SkeletonText>
      </Flex>
    </Flex>
  )
}

export default KeyResultSectionDescription
