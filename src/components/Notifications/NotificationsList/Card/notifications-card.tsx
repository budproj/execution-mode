import { Text, Box, Heading, Avatar, AvatarBadge, Flex } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { ArrowRightLong } from 'src/components/Icon'
import ChevronDownCircleIcon from 'src/components/Icon/ChevronDown/chvron-down-circle'
import { KeyResultDynamicIcon } from 'src/components/KeyResult'
import ConfidenceTag from 'src/components/KeyResult/ConfidenceTag'
import { userAtomFamily } from 'src/state/recoil/user'
import meAtom from 'src/state/recoil/user/me'

const CardNotification = () => {
  const myID = useRecoilValue(meAtom)
  const user = useRecoilValue(userAtomFamily(myID))

  return (
    <Box
      bg="new-gray.50"
      p={2}
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      gap={5}
    >
      {user && (
        <Avatar name={user.fullName ?? user.firstName} src={user.picture}>
          <AvatarBadge boxSize="1.3em">
            {/* <ChevronLeftCircleIcon
              h="1.3em"
              w="1.3em"
              stroke="none"
              bg="#FF616A"
              borderRadius="50%"
              fill="#FFFFFF"
              desc="voltar"
            /> */}
            <ChevronDownCircleIcon
              h="1em"
              w="1em"
              desc="ds"
              fill="white"
              bg="#FF616A"
              borderRadius="50%"
              stroke="white"
            />
          </AvatarBadge>
        </Avatar>
      )}
      <Flex flexDir="column" alignItems="flex-start" justifyContent="center" gap={3}>
        <Heading display="flex" alignItems="flex-start" justifyContent="center" flexDir="column">
          <Text fontSize={16} fontWeight="bold" color="new-gray.800">
            Ricardo Oliveira
          </Text>
          <Text fontSize={14} fontWeight="normal" color="new-gray.700">
            reportou baixa
          </Text>
        </Heading>
        <Flex alignItems="center" justifyContent="center" gap={2}>
          <KeyResultDynamicIcon iconSize={5} boxSize={7} borderRadius={4} title="Message" />
          <Text color="new-gray.800" fontWeight="bold" fontSize={14}>
            Transformar o Bud em uma maquina do tempo!
          </Text>
        </Flex>
        <Box display="flex" alignItems="center" justifyContent="flex-start" gap={2}>
          <ConfidenceTag confidenceValue={60} />
          <ArrowRightLong desc="arr" fill="new-gray.500" />
          <ConfidenceTag confidenceValue={10} />
        </Box>
      </Flex>
    </Box>
  )
}

export default CardNotification
