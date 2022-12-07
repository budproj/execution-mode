import { Avatar, Box, Flex, Grid, GridItem, Text, Tag } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { PauseIcon } from 'src/components/Icon'
import SuitcaseIcon from 'src/components/Icon/Suitcase'
import { useGetEmoji } from 'src/components/Routine/hooks'
import { useGetUserDetails } from 'src/components/User/hooks'

import messages from './messages'

export interface UsersTeamListProperties {
  userId: string
  type?: string
}

interface UserRoutineDataProperties {
  roadBlock: string
  productivity: string
  feeling: string
}

export const UsersTeamList = ({ type, userId }: UsersTeamListProperties) => {
  const intl = useIntl()
  const { getEmoji } = useGetEmoji()
  const { servicesPromise } = useContext(ServicesContext)

  const { data: user } = useGetUserDetails(userId)
  const [userRoutineData, setUserRoutineData] = useState<UserRoutineDataProperties>()

  useEffect(() => {
    async function getUserRoutineData() {
      const { routines } = await servicesPromise

      const { data } = await routines.get<UserRoutineDataProperties>(
        `/answers/overview/user/${userId}`,
      )
      setUserRoutineData(data)
    }

    getUserRoutineData()
  }, [servicesPromise, userId])

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

    if ((type = 'roadblock')) {
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
      gridTemplateColumns="1fr 1fr 1fr 1fr"
      flex="1"
      borderTop="1px solid #D9E2F6"
    >
      <GridItem display="flex" color="new-gray.800" fontWeight="500" fontSize="12px">
        <Avatar src={user?.picture} width="50px" height="50px" marginRight="20px" />
        <Box>
          <Text color="new-gray.900" fontWeight={450} fontSize="16px">
            {user?.fullName}
          </Text>
          <Text color="new-gray.600" fontWeight={450} fontSize="14px">
            {user?.role}
          </Text>
        </Box>
      </GridItem>
      <GridItem
        display="flex"
        flexDir="column"
        color="new-gray.800"
        fontWeight="500"
        fontSize="12px"
      >
        <Tag
          width="fit-content"
          bg="new-gray.300"
          color="new-gray.700"
          textTransform="uppercase"
          marginBottom="5px"
        >
          {user?.teams?.edges[0].node.name}
        </Tag>

        {user?.teams?.edges[1] && (
          <Tag width="fit-content" bg="new-gray.300" color="new-gray.700" textTransform="uppercase">
            {user?.teams?.edges[1]?.node.name}
          </Tag>
        )}
      </GridItem>
      <GridItem color="new-gray.800" fontWeight="500" fontSize="12px">
        {defaultIcon(type)}
      </GridItem>
      <GridItem
        justifySelf="center"
        gap="15px"
        display="flex"
        color="new-gray.800"
        fontWeight="500"
        fontSize="12px"
      >
        {type === 'feeling' || (
          <Box display="flex" flexDir="column" textAlign="center">
            {getEmoji({ felling: Number(userRoutineData?.feeling), size: '25px' })}

            <Text color="yellow.600">{userRoutineData?.feeling}</Text>
          </Box>
        )}
        {type === 'productivity' || (
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
        )}
        {type === 'roadblock' || (
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

            <Text color="pink.500">{userRoutineData?.roadBlock === 'y' ? 'Sim' : 'Não'}</Text>
          </Box>
        )}
      </GridItem>
    </Grid>
  )
}
