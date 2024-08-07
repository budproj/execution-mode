import { Box, Flex, Heading, Skeleton, SkeletonText, Text, Stack, useToken } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { memo, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { DynamicAvatarGroup, IntlLink, SliderWithFilledTrack } from 'src/components/Base'
import CrownIcon from 'src/components/Icon/Crown'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { GraphQLEffect } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { answerSummaryAtom } from 'src/state/recoil/routine/answer-summary'
import { teamAtomFamily } from 'src/state/recoil/team'
import { usersCompany } from 'src/state/recoil/team/users-company'

import { MenuCard } from './MenuCard'
import messages from './messages'

export interface TeamCardProperties {
  id?: Team['id']
  isFromHoverMenu?: boolean
}

const HoverableWrapper = styled(Box)`
  &:hover {
    box-shadow: ${({ shadowstyle }) => shadowstyle};
    transform: scale(1.03);
    z-index: 1;
  }
`

const TeamCard = memo(({ id, isFromHoverMenu = false }: TeamCardProperties) => {
  const router = useRouter()
  const intl = useIntl()
  const team = useRecoilValue(teamAtomFamily(id))
  const setUsersCompany = useSetRecoilState(usersCompany)
  const setAnswersSummary = useSetRecoilState(answerSummaryAtom)

  const [users, setUserEdges] = useConnectionEdges<User>()
  const [shadowStrokeLight] = useToken('shadows', ['for-background.light'])

  const isCompany = Boolean(team?.isCompany)
  const isLoaded = Boolean(team)
  const isAllowedToEditTeam = team?.policy?.update === GraphQLEffect.ALLOW
  const progress = team?.status?.progress ?? 0

  useEffect(() => {
    if (team) setUserEdges(team.users?.edges)
  }, [team, setUserEdges])

  const handleClickLink = () => {
    setUsersCompany([])
    setAnswersSummary([])
    router.push(`/explore/${id ?? '#'}`)
  }

  return (
    <HoverableWrapper
      id={isCompany ? 'explore-company-card' : undefined}
      position="relative"
      transition="0.4s all ease-out"
      shadowStyle={shadowStrokeLight}
      bg="white"
      borderRadius={16}
      px={10}
      py={isFromHoverMenu ? 0 : 12}
      _hover={{ borderLeftRadius: '25px' }}
    >
      {isAllowedToEditTeam && !isFromHoverMenu && (
        <MenuCard position="absolute" top="20px" right="20px" teamId={team?.id} />
      )}
      <IntlLink href={`/explore/${id ?? '#'}`} onClick={handleClickLink}>
        <Flex direction="column" gridGap={6} maxW="90%" minH="300px" justifyContent="center">
          <Flex direction="column" justifyContent="flex-end">
            {isCompany && (
              <CrownIcon
                title={intl.formatMessage(messages.crownIconTitle)}
                desc={intl.formatMessage(messages.crownIconDesc)}
                w={10}
                h="auto"
                fill="yellow.500"
                mb={2}
              />
            )}
            <Skeleton isLoaded={isLoaded} mt={2} {...buildSkeletonMinSize(isLoaded, 200, 40)}>
              <Heading size="lg" color="black.900">
                {team?.name}
              </Heading>
            </Skeleton>
          </Flex>

          <SkeletonText isLoaded={isLoaded} noOfLines={3} spacing="4">
            <Text color="gray.400" noOfLines={3}>
              {team?.description}
            </Text>
          </SkeletonText>

          {isFromHoverMenu ? (
            <>
              <Box pt={0}>
                <DynamicAvatarGroup users={users} isLoaded={isLoaded} />
              </Box>
              <Stack direction="row" gridGap={4} alignItems="center">
                <Skeleton isLoaded={isLoaded} borderRadius="full" flexGrow={1} display="flex">
                  <SliderWithFilledTrack trackThickness={3} value={progress} trackBg="black.200" />
                </Skeleton>

                <Skeleton isLoaded={isLoaded} borderRadius="full">
                  <Text fontSize="md" color="black.600">
                    {intl.formatNumber(progress / 100, { style: 'percent' })}
                  </Text>
                </Skeleton>
              </Stack>
            </>
          ) : (
            <>
              <Stack direction="row" gridGap={4} alignItems="center">
                <Skeleton isLoaded={isLoaded} borderRadius="full" flexGrow={1} display="flex">
                  <SliderWithFilledTrack trackThickness={3} value={progress} trackBg="black.200" />
                </Skeleton>

                <Skeleton isLoaded={isLoaded} borderRadius="full">
                  <Text fontSize="md" color="black.600">
                    {intl.formatNumber(progress / 100, { style: 'percent' })}
                  </Text>
                </Skeleton>
              </Stack>

              <Box pt={12}>
                <DynamicAvatarGroup users={users} isLoaded={isLoaded} />
              </Box>
            </>
          )}
        </Flex>
      </IntlLink>
    </HoverableWrapper>
  )
})

export default TeamCard
