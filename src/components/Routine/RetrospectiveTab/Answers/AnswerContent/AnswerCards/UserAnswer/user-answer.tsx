import {
  Flex,
  Heading,
  Button,
  Box,
  Text,
  useToken,
  SkeletonCircle,
  Avatar,
  Skeleton,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useIntl } from 'react-intl'

import ArrowLeftLongBoldIcon from 'src/components/Icon/ArrowLeftLongBold'
// Import ChevronDownIcon from 'src/components/Icon/ChevronDown'
// Import ChevronUpIcon from 'src/components/Icon/ChevronUp'
import { User } from 'src/components/User/types'

import messages from './messages'

interface UserAnswerProperties {
  user: Partial<User>
}

export const UserAnswer = ({ user }: UserAnswerProperties) => {
  const [newGray600] = useToken('colors', ['new-gray.600'])
  const router = useRouter()
  const intl = useIntl()

  const userFullName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`

  const returnToOverview = () => {
    router.push(
      {
        query: {
          ...router.query,
          answerId: undefined,
        },
      },
      undefined,
      { shallow: true },
    )
  }

  return (
    <Flex p={6}>
      <Box>
        <Button
          width="38px"
          height="38px"
          bgColor="new-gray.200"
          borderRadius="10px"
          rightIcon={
            <ArrowLeftLongBoldIcon
              desc={intl.formatMessage(messages.returnToOverviewIcon)}
              ml="-7px"
              w="1.3em"
              h="1.3em"
              fill={newGray600}
            />
          }
          onClick={() => returnToOverview()}
        />
        <Text
          mt={1}
          textAlign="center"
          cursor="pointer"
          color="new-gray.600"
          onClick={() => returnToOverview()}
        >
          {intl.formatMessage(messages.returnToOverviewLabel)}
        </Text>
      </Box>

      <Flex ml={6}>
        <SkeletonCircle isLoaded={Boolean(user?.firstName)} w={50} h={50}>
          <Avatar name={userFullName} src={user?.picture} w={50} h={50} />
        </SkeletonCircle>

        <Flex ml={4} flexDirection="column">
          <Skeleton
            isLoaded={Boolean(user.firstName)}
            display="inline-block"
            minWidth="400px"
            mt={1}
          >
            <Heading as="h3" fontSize="1.5rem" fontWeight={600}>
              {userFullName}
            </Heading>
          </Skeleton>
          <Skeleton
            isLoaded={Boolean(user.role)}
            display="inline-block"
            minWidth="100px"
            lineHeight="1rem"
            mt={1}
          >
            <Text color="new-gray.600">{user.role}</Text>
          </Skeleton>
        </Flex>
      </Flex>

      {/* <Flex margin="0 0 0 auto" flexDirection="column">
        <Flex>
          <Button
            width="40px"
            height="38px"
            bgColor="new-gray.200"
            borderRadius="10px 0 0 10px"
            rightIcon={<ChevronUpIcon desc="arrow" ml="-7px" stroke={newGray600} />}
          />
          <Button
            ml={1}
            width="38px"
            height="38px"
            bgColor="new-gray.200"
            borderRadius="0 10px 10px 0"
            rightIcon={<ChevronDownIcon desc="arrow" ml="-7px" stroke={newGray600} />}
          />
        </Flex>
        <Text mt={1} textAlign="center" color="new-gray.600">
          Pessoas
        </Text>
      </Flex> */}
    </Flex>
  )
}
