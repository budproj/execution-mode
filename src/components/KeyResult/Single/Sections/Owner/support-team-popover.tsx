import { Box, Flex, PopoverHeader, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

import { TooltipWithRichText } from 'src/components/Base'
import ChevronLeftIcon from 'src/components/Icon/ChevronLeft'
import InfoCircleIcon from 'src/components/Icon/InfoCircle'
import PlusIcon from 'src/components/Icon/Plus'
import TimesIcon from 'src/components/Icon/Times'
import { NamedAvatar } from 'src/components/User'
import { AllReachableUsers } from 'src/components/User/AllReachableUsers/wrapper'
import { User } from 'src/components/User/types'

import { KeyResultTooltipSupportTeam } from './RichTooltips'

type SupportTeamPopoverProperties = {
  supportTeamMembers?: User[]
  addUser: (userId: string) => void
  removeUser: (userId: string) => void
  ownerName?: string
}

type AddNewMemberProperties = {
  handleUserSelect: (userID: string) => void
  toggleIsAdding: () => void
}

type EachMemberProperties = {
  member: User
  handleUserRemove: (userID: string) => void
}

const EachMember = ({ member, handleUserRemove }: EachMemberProperties) => {
  const [isHovering, setIsHovering] = useState(false)
  const setIsHoveringGenerator = (state: boolean) => () => setIsHovering(state)

  return (
    <Stack
      key={member.id}
      alignItems="center"
      direction="row"
      flexWrap="nowrap"
      onMouseEnter={setIsHoveringGenerator(true)}
      onMouseLeave={setIsHoveringGenerator(false)}
      onClick={() => handleUserRemove(member.id)}
    >
      <Flex flex={1}>
        <NamedAvatar nameColor="new-gray.800" subtitleType="role" userID={member.id.toString()} />
      </Flex>
      {isHovering && (
        <Flex
          w={6}
          h={6}
          marginRight="100px"
          justifyContent="center"
          alignItems="center"
          borderColor="new-gray.500"
          borderRadius="full"
          borderWidth={2}
          as="span"
        >
          <TimesIcon scale={0.05} fill="new-gray.500" desc="adicionar pessoa" />
        </Flex>
      )}
    </Stack>
  )
}

const AddNewMember = ({ handleUserSelect, toggleIsAdding }: AddNewMemberProperties) => (
  <Box>
    <PopoverHeader marginBottom="1em" onClick={toggleIsAdding}>
      <Stack alignItems="center" direction="row" cursor="pointer">
        <Flex
          w={5}
          h={5}
          justifyContent="center"
          alignItems="center"
          borderColor="new-gray.700"
          borderRadius="full"
          borderWidth={2}
        >
          <ChevronLeftIcon w={3} h={3} fill="new-gray.700" stroke="none" desc="voltar" />
        </Flex>
        <Text as="span" fontSize="lg" color="new-gray.700" fontWeight="400">
          Time de Apoio
        </Text>
      </Stack>
    </PopoverHeader>
    <AllReachableUsers onSelect={handleUserSelect} />
  </Box>
)

export const SupportTeamPopover = ({
  supportTeamMembers,
  addUser,
  removeUser,
  ownerName,
}: SupportTeamPopoverProperties) => {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const toggleIsAdding = () => setIsAdding(!isAdding)

  const handleUserSelect = (userId: string) => {
    addUser(userId)
    toggleIsAdding()
  }

  const handleUserRemove = (userId: string) => {
    removeUser(userId)
  }

  const [isHoveringAddButton, setIsHoveringAddButton] = useState(false)
  const handleMouseEnterOnAddButton = () => setIsHoveringAddButton(true)
  const handleMouseLeaveOnAddButton = () => setIsHoveringAddButton(false)

  return isAdding ? (
    <AddNewMember handleUserSelect={handleUserSelect} toggleIsAdding={toggleIsAdding} />
  ) : (
    <Box>
      <PopoverHeader paddingBottom="1em" marginBottom="1em">
        <TooltipWithRichText tooltip={<KeyResultTooltipSupportTeam />}>
          <Stack alignItems="center" direction="row" cursor="help">
            <Text as="span" fontSize="xl" color="new-gray.900" fontWeight="400">
              Time de Apoio
            </Text>
            <InfoCircleIcon
              fill="new-gray.900"
              stroke="new-gray.900"
              desc="Um círculo com um ponto de interrogação ao centro"
            />
          </Stack>
        </TooltipWithRichText>
        <Text color="new-gray.600">
          Essas são as pessoas ajudando {ownerName} neste resultado-chave:
        </Text>
      </PopoverHeader>
      <Box>
        {supportTeamMembers?.map((member) => (
          <EachMember key={member.id} member={member} handleUserRemove={handleUserRemove} />
        ))}
        <Box
          cursor="pointer"
          onMouseEnter={handleMouseEnterOnAddButton}
          onMouseLeave={handleMouseLeaveOnAddButton}
          onClick={toggleIsAdding}
        >
          <Stack alignItems="center" direction="row" marginTop="1.5em">
            <Flex
              w={8}
              h={8}
              justifyContent="center"
              alignItems="center"
              borderColor={isHoveringAddButton ? 'brand.600' : 'brand.500'}
              borderRadius="full"
              borderWidth={2}
              as="span"
            >
              <PlusIcon
                scale={0.1}
                fill={isHoveringAddButton ? 'brand.600' : 'brand.500'}
                desc="adicionar pessoa"
              />
            </Flex>
            <Text color={isHoveringAddButton ? 'brand.600' : 'brand.500'} fontWeight="500">
              Adicionar pessoa
            </Text>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
