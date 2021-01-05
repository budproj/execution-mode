import { Flex, Text, SkeletonText } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import messages from './messages'

export interface KeyResultSingleDescriptionProperties {
  keyResultID?: KeyResult['id']
}

const descriptionSelector = buildPartialSelector<KeyResult['description']>('description')

const Description = ({ keyResultID }: KeyResultSingleDescriptionProperties) => {
  const intl = useIntl()
  const description = useRecoilValue(descriptionSelector(keyResultID))

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const isDescriptionLoaded = Boolean(description || description === '')

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

export default Description
