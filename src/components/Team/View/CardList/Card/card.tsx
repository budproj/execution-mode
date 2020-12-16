import { Flex, Heading, Skeleton, SkeletonText, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import CrownIcon from 'src/components/Icons/Crown'
import { Team } from 'src/components/Team/types'
import { teamAtomFamily } from 'src/state/recoil/team'

import messages from './messages'

export interface TeamCardProperties {
  id?: Team['id']
  isCompany?: boolean
}

const TeamCard = ({ id, isCompany }: TeamCardProperties) => {
  const intl = useIntl()
  const teamAtom = teamAtomFamily(id)
  const team = useRecoilValue(teamAtom)
  const isLoaded = Boolean(team)

  return (
    <Flex bg="gray.50" borderRadius="15px" py={6} px={10} direction="column" gridGap={4}>
      {isCompany && (
        <CrownIcon
          title={intl.formatMessage(messages.crownIconTitle)}
          desc={intl.formatMessage(messages.crownIconDesc)}
          w="34px"
          h="auto"
          position="absolute"
        />
      )}
      <Skeleton isLoaded={isLoaded} mt={8} w="80%" minH="40px">
        <Heading size="lg">{team?.name}</Heading>
      </Skeleton>

      <SkeletonText isLoaded={isLoaded} noOfLines={2}>
        <Text color="gray.400">{team?.description}</Text>
      </SkeletonText>
    </Flex>
  )
}

export default TeamCard
