import { Avatar, Box, Flex, Grid, GridItem, Text, Tag, HStack } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import { PauseIcon } from 'src/components/Icon'
import SuitcaseIcon from 'src/components/Icon/Suitcase'
import tabMessages from 'src/components/Page/Team/messages'
import { useGetEmoji } from 'src/components/Routine/hooks'
import LastAccess from 'src/components/Team/IndicatorsTable/Columns/last-access'
import { useGetUserDetails } from 'src/components/User/hooks'

import { CARD_TYPES } from '../../utils/card-types'

import messages from './messages'

export interface UsersTeamListProperties {
  userId: string
  type?: string
}

export interface UserRoutineDataProperties {
  roadBlock: string
  productivity: string
  feeling: string
  lastRoutineAnswerId: string
}

export const UsersTeamList = ({ type, userId }: UsersTeamListProperties) => {
  const intl = useIntl()
  const { getEmoji } = useGetEmoji()
  const [loaded, setIsLoaded] = useState<boolean>()
  const { servicesPromise } = useContext(ServicesContext)

  const { data: user } = useGetUserDetails(userId)
  const [userRoutineData, setUserRoutineData] = useState<UserRoutineDataProperties>()

  useEffect(() => {
    async function getUserRoutineData() {
      const { routines } = await servicesPromise
      try {
        setIsLoaded(false)
        const { data: routineData } = await routines.get<UserRoutineDataProperties>(
          `/answers/overview/user/${userId}`,
        )

        if (routineData) setUserRoutineData(routineData)
      } catch (error: unknown) {
        console.warn({ routine_or_amplitude_server_warning: error })
      } finally {
        setIsLoaded(true)
      }
    }

    getUserRoutineData()
  }, [servicesPromise, user?.id, userId])

  const defaultIcon = (type?: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { getEmoji } = useGetEmoji()
    if (type === 'feeling') {
      return getEmoji({ felling: Number(userRoutineData?.feeling), size: '40px' })
    }

    if (type === 'productivity') {
      return (
        <Flex alignItems="center" gap="5px">
          <Box
            borderRadius="50%"
            width="32px"
            height="32px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            background="blue.400"
          >
            <SuitcaseIcon
              boxSize="16px"
              desc={intl.formatMessage(messages.suitcaseIconDescription)}
            />
          </Box>
          <Text color="blue.400" fontWeight={700} fontSize="24px">
            {userRoutineData?.productivity}
          </Text>
        </Flex>
      )
    }

    if (type === 'roadblock') {
      return (
        <Box
          borderRadius="50%"
          width="32px"
          height="32px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          background="pink.500"
        >
          <PauseIcon
            boxSize="36px"
            fill="pink.500"
            desc={intl.formatMessage(messages.pauseIconDescription)}
          />
        </Box>
      )
    }
  }

  return (
    <Grid
      padding="15px 0 15px 0"
      gridTemplateColumns="1fr 1fr 1fr 1fr 1fr"
      flex="1"
      borderTop="1px solid #D9E2F6"
      _hover={{ background: 'black.50' }}
      cursor="pointer"
    >
      <Link passHref href={`/profile/${user?.id ?? ''}`}>
        <GridItem display="flex" color="new-gray.800" fontWeight="500" fontSize="12px">
          <Avatar src={user?.picture} width="50px" height="50px" marginRight="20px" />
          <Box>
            <Text color="new-gray.900" fontWeight={400} fontSize="16px">
              {user?.fullName}
            </Text>
            <Text color="new-gray.600" fontWeight={400} fontSize="14px">
              {user?.role}
            </Text>
          </Box>
        </GridItem>
      </Link>

      <GridItem
        display="flex"
        flexDir="column"
        color="new-gray.800"
        fontWeight="500"
        fontSize="12px"
      >
        <Link passHref href={`/explore/${user?.teams?.edges[0].node.id ?? ''}`}>
          <Tag
            width="fit-content"
            bg="new-gray.300"
            color="new-gray.700"
            textTransform="uppercase"
            marginBottom="5px"
          >
            {user?.teams?.edges[0].node.name}
          </Tag>
        </Link>

        {user?.teams?.edges[1] && (
          <Link passHref href={`/explore/${user?.teams?.edges[1].node.id ?? ''}`}>
            <Tag
              width="fit-content"
              bg="new-gray.300"
              color="new-gray.700"
              textTransform="uppercase"
            >
              {user?.teams?.edges[1]?.node.name}
            </Tag>
          </Link>
        )}
      </GridItem>
      {type === CARD_TYPES.KRMEMBERS ? (
        <Text color="new-gray.700" fontSize={14}>
          {intl.formatMessage(messages.noKrsFlag)}
        </Text>
      ) : (
        <Link
          passHref
          href={`/explore/${
            user?.companies?.edges[0].node.id ?? ''
          }/?activeTab=retrospectiva&answerId=${userRoutineData?.lastRoutineAnswerId ?? ''}`}
        >
          <GridItem color="new-gray.800" fontWeight="500" fontSize="12px">
            {defaultIcon(type)}
          </GridItem>
        </Link>
      )}
      <GridItem
        justifySelf="center"
        gap="15px"
        display="flex"
        color="new-gray.800"
        fontWeight="500"
        fontSize="12px"
      >
        {userRoutineData ? (
          <Link
            passHref
            href={`/explore/${user?.companies?.edges[0].node.id ?? ''}/?activeTab=${intl
              .formatMessage(tabMessages.retrospectiveTeamTab)
              .toLowerCase()}&answerId=${userRoutineData?.lastRoutineAnswerId ?? ''}`}
          >
            <GridItem
              justifySelf="center"
              gap="15px"
              display="flex"
              color="new-gray.800"
              fontWeight="500"
              fontSize="12px"
            >
              {type === 'feeling' || (
                <TooltipWithDelay label={intl.formatMessage(messages.feelingLabel)}>
                  <Box display="flex" flexDir="column" textAlign="center">
                    {getEmoji({ felling: Number(userRoutineData?.feeling), size: '25px' })}

                    <Text color="yellow.600">{userRoutineData?.feeling}</Text>
                  </Box>
                </TooltipWithDelay>
              )}
              {type === 'productivity' || (
                <TooltipWithDelay label={intl.formatMessage(messages.productivityLabel)}>
                  <Box display="flex" flexDir="column" textAlign="center">
                    <Box
                      borderRadius="50%"
                      width="24px"
                      height="24px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      background="blue.400"
                    >
                      <SuitcaseIcon
                        boxSize="12px"
                        desc={intl.formatMessage(messages.suitcaseIconDescription)}
                      />
                    </Box>

                    <Text color="blue.400">{userRoutineData?.productivity}</Text>
                  </Box>
                </TooltipWithDelay>
              )}
              {type === 'roadblock' || (
                <TooltipWithDelay label={intl.formatMessage(messages.roadblockLabel)}>
                  <Box textAlign="center">
                    <Box
                      borderRadius="50%"
                      width="24px"
                      height="24px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      background="pink.500"
                    >
                      <PauseIcon
                        boxSize="28px"
                        fill="pink.500"
                        desc={intl.formatMessage(messages.pauseIconDescription)}
                      />
                    </Box>

                    <Text color="pink.500">
                      {userRoutineData?.roadBlock === 'y' ? 'Sim' : 'Não'}
                    </Text>
                  </Box>
                </TooltipWithDelay>
              )}
            </GridItem>
          </Link>
        ) : (
          <LastRetrospectiveEmptyState />
        )}
      </GridItem>
      <LastAccess
        isLoaded={loaded}
        lastDateAccess={user?.amplitude?.last_used}
        display="flex"
        color="new-gray.800"
        fontWeight="500"
        fontSize="12px"
        gap="1px"
        alignItems="center"
        justifyContent="center"
      />
    </Grid>
  )
}

const LastRetrospectiveEmptyState = () => {
  return (
    <HStack gap={6}>
      <Text fontSize="2rem" transform="translateX(90%)" color="#b5c0db">
        -
      </Text>
      <Text fontSize="2rem" transform="translateX(90%)" color="#b5c0db">
        -
      </Text>
      <Text fontSize="2rem" transform="translateX(90%)" color="#b5c0db">
        -
      </Text>
    </HStack>
  )
}
