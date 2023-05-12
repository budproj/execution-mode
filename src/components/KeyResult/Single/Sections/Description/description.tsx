import { Divider, Flex, SkeletonText, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { GraphQLEffect } from 'src/components/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import { KeyResultSectionHeading } from '../Heading/wrapper'

import messages from './messages'

export interface KeyResultSectionDescriptionProperties {
  keyResultID?: KeyResult['id']
  isLoading?: boolean
}

const KeyResultSectionDescription = ({
  keyResultID,
  isLoading,
}: KeyResultSectionDescriptionProperties) => {
  const intl = useIntl()
  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))

  const hasData = Boolean(keyResult?.description)
  const canUpdate = keyResult?.policy?.update === GraphQLEffect.ALLOW && keyResult?.status?.isActive
  isLoading ??= hasData

  return hasData || isLoading || canUpdate ? (
    <>
      <Flex gridGap={2} direction="column">
        <KeyResultSectionHeading>{intl.formatMessage(messages.label)}</KeyResultSectionHeading>
        <Flex alignItems="center" gridGap={2}>
          <SkeletonText isLoaded={!isLoading} noOfLines={5} spacing={2} w="100%">
            <Text fontSize="md" color="black.800" maxW={420}>
              {keyResult?.description}
            </Text>
          </SkeletonText>
        </Flex>
      </Flex>

      <Divider borderColor="gray.100" />
    </>
  ) : // eslint-disable-next-line unicorn/no-null
  null
}

export default KeyResultSectionDescription
