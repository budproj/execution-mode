import {
  Flex,
  Heading,
  Button,
  Box,
  Text,
  useToken,
  SkeletonCircle,
  Avatar,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

import ArrowLeftLongBoldIcon from 'src/components/Icon/ArrowLeftLongBold'
// Import ChevronDownIcon from 'src/components/Icon/ChevronDown'
// Import ChevronUpIcon from 'src/components/Icon/ChevronUp'
import { User } from 'src/components/User/types'

interface UserAnswerProperties {
  user: Partial<User>
}

export const UserAnswer = ({ user }: UserAnswerProperties) => {
  const [newGray600] = useToken('colors', ['new-gray.600'])
  const router = useRouter()

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
            <ArrowLeftLongBoldIcon desc="arrow" ml="-7px" w="1.3em" h="1.3em" fill={newGray600} />
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
          Voltar
        </Text>
      </Box>

      <Flex ml={6}>
        <SkeletonCircle isLoaded={Boolean(user)} w={50} h={50}>
          <Avatar name={user?.fullName} src={user?.picture} w={50} h={50} />
        </SkeletonCircle>

        <Box ml={4}>
          <Heading as="h3" fontSize="1.5rem" fontWeight={600} mt={1}>
            {user?.fullName}
          </Heading>
          <Text color="new-gray.600">{user.role}</Text>
        </Box>
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
