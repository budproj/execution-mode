import { Box, Flex, Heading, Skeleton, SkeletonText, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { DynamicAvatarGroup, IntlLink, SliderWithFilledTrack } from 'src/components/Base'
import CrownIcon from 'src/components/Icon/Crown'
import { Team } from 'src/components/Team/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'
import { teamAtomFamily } from 'src/state/recoil/team'

import messages from './messages'

export interface TeamCardProperties {
  id?: Team['id']
}

const TeamCard = ({ id }: TeamCardProperties) => {
  const intl = useIntl()
  const team = useRecoilValue(teamAtomFamily(id))
  const isCompany = Boolean(team?.isCompany)
  const [confidenceTag, setConfidence] = useConfidenceTag(team?.confidence)

  useEffect(() => {
    if (typeof team?.confidence !== 'undefined') setConfidence(team?.confidence)
  }, [team, setConfidence])

  const isLoaded = Boolean(team)

  return (
    <IntlLink href={id ?? '#'}>
      <Box
        bg="gray.50"
        borderRadius={16}
        py={12}
        px={10}
        transition="0.4s all ease-out"
        _hover={{ bg: 'white', boxShadow: 'md', transform: 'scale(1.03)' }}
      >
        <Flex direction="column" gridGap={6} maxW="90%" minH="300px">
          <Flex flexGrow={1} direction="column" justifyContent="flex-end">
            <Box minH={8}>
              {isCompany && (
                <CrownIcon
                  title={intl.formatMessage(messages.crownIconTitle)}
                  desc={intl.formatMessage(messages.crownIconDesc)}
                  w={10}
                  h="auto"
                />
              )}
            </Box>
            <Skeleton isLoaded={isLoaded} mt={2} {...buildSkeletonMinSize(isLoaded, 200, 40)}>
              <Heading size="lg">{team?.name}</Heading>
            </Skeleton>
          </Flex>

          <SkeletonText isLoaded={isLoaded} noOfLines={3} spacing="4">
            <Text color="gray.400" noOfLines={3}>
              {team?.description}
            </Text>
          </SkeletonText>
          <Skeleton isLoaded={isLoaded} borderRadius="full">
            <SliderWithFilledTrack
              trackThickness={3}
              value={team?.progress}
              trackColor={confidenceTag.color.primary}
            />
          </Skeleton>
          <Box pt={12}>
            <DynamicAvatarGroup users={team?.users} isLoaded={isLoaded} />
          </Box>
        </Flex>
      </Box>
    </IntlLink>
  )
}

export default TeamCard
