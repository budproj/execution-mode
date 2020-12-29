import { Box, Flex, Heading, Skeleton, SkeletonText, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { DynamicAvatarGroup, IntlLink, Slider } from 'src/components/Base'
import CrownIcon from 'src/components/Icon/Crown'
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
  const href = [isCompany ? 'company' : 'team', id].join('/')

  const isLoaded = Boolean(team)

  return (
    <IntlLink href={href}>
      <Box
        bg="gray.50"
        borderRadius="15px"
        py={12}
        px={10}
        transition="0.4s all ease-out"
        _hover={{ bg: 'white', boxShadow: 'md', transform: 'scale(1.03)' }}
      >
        <Flex direction="column" gridGap={6} maxW="90%" minH="300px">
          <Flex flexGrow={1} direction="column" justifyContent="flex-end">
            {isCompany && (
              <CrownIcon
                title={intl.formatMessage(messages.crownIconTitle)}
                desc={intl.formatMessage(messages.crownIconDesc)}
                w="34px"
                h="auto"
              />
            )}
            <Skeleton isLoaded={isLoaded} mt={2} w="80%" minH="40px">
              <Heading size="lg">{team?.name}</Heading>
            </Skeleton>
          </Flex>

          <SkeletonText isLoaded={isLoaded} noOfLines={2} spacing="4">
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
    </IntlLink>
  )
}

export default TeamCard
