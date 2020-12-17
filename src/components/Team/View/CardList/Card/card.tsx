import { Box, Flex, Heading, Skeleton, SkeletonText, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { Slider } from 'src/components/Base'
import CrownIcon from 'src/components/Icons/Crown'
import { Team } from 'src/components/Team/types'
import { companyAtomFamily } from 'src/state/recoil/company'
import companyCurrentProgress from 'src/state/recoil/company/selectors/current-progress'
import { teamAtomFamily } from 'src/state/recoil/team'
import teamCurrentProgress from 'src/state/recoil/team/selectors/current-progress'

import messages from './messages'

export interface TeamCardProperties {
  id?: Team['id']
  isCompany?: boolean
}

const TeamCard = ({ id, isCompany }: TeamCardProperties) => {
  const intl = useIntl()
  const atom = isCompany ? companyAtomFamily(id) : teamAtomFamily(id)
  const currentProgressSelector = isCompany ? companyCurrentProgress(id) : teamCurrentProgress(id)

  const team = useRecoilValue(atom)
  const currentProgress = useRecoilValue(currentProgressSelector)

  const isLoaded = Boolean(team)

  console.log(currentProgress)

  return (
    <Box bg="gray.50" borderRadius="15px" py={6} px={10}>
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
          <Slider isDisabled value={currentProgress} trackThickness="12px" />
        </Skeleton>
      </Flex>
    </Box>
  )
}

export default TeamCard
