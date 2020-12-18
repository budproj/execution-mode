import { Box, Flex, Heading, Skeleton, SkeletonText, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { DynamicAvatarGroup, Slider } from 'src/components/Base'
import CrownIcon from 'src/components/Icons/Crown'
import { Team } from 'src/components/Team/types'
import { companyAtomFamily } from 'src/state/recoil/company'
import confidenceTagSelector from 'src/state/recoil/key-result/selectors/confidence-tag'
import { teamAtomFamily } from 'src/state/recoil/team'

import messages from './messages'

export interface TeamCardProperties {
  id?: Team['id']
  isCompany?: boolean
}

const TeamCard = ({ id, isCompany }: TeamCardProperties) => {
  const intl = useIntl()
  const atom = isCompany ? companyAtomFamily(id) : teamAtomFamily(id)

  const team = useRecoilValue(atom)
  const confidenceTag = useRecoilValue(confidenceTagSelector(team?.currentConfidence))

  const isLoaded = Boolean(team)

  return (
    <Box bg="gray.50" borderRadius="15px" py={12} px={10}>
      <Flex direction="column" gridGap={6} maxW="90%">
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

        <Skeleton isLoaded={isLoaded} borderRadius="full" height="12px">
          <Slider
            isDisabled
            value={team?.currentProgress}
            trackThickness="12px"
            trackColor={confidenceTag.color}
          />
        </Skeleton>

        <Box pt={12}>
          <DynamicAvatarGroup users={team?.users} isLoaded={isLoaded} />
        </Box>
      </Flex>
    </Box>
  )
}

export default TeamCard
