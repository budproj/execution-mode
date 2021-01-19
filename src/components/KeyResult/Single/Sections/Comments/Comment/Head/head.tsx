import { Avatar, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { ProgressReport } from 'src/components/KeyResult/types'
import { User } from 'src/components/User/types'

export interface KeyResultSectionCommentsCommentHeadProperties {
  user?: User
  createdAt?: ProgressReport['createdAt']
}

const KeyResultSectionCommentsCommentHead = ({
  user,
  createdAt,
}: KeyResultSectionCommentsCommentHeadProperties) => {
  const intl = useIntl()

  return (
    <Flex alignItems="center" gridGap={4}>
      <Avatar name={user?.fullName} src={user?.picture} />

      <Flex direction="column" gridGap={1}>
        <Heading as="h4" fontSize="18px" fontWeight={500}>
          {user?.fullName}
        </Heading>

        <Text fontSize="16px" color="gray.200">
          {intl.formatDate(createdAt)}
        </Text>
      </Flex>
    </Flex>
  )
}

export default KeyResultSectionCommentsCommentHead
