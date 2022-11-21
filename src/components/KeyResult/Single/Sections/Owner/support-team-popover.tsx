import { Box, Flex, PopoverHeader, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import { TooltipWithRichText } from 'src/components/Base'
import { getScrollableItem } from 'src/components/Base/ScrollableItem'
import { PlusOutline } from 'src/components/Icon'
import ChevronLeftCircleIcon from 'src/components/Icon/ChevronLeft/chevron-left-circle'
import InfoCircleIcon from 'src/components/Icon/InfoCircle'
import TimesInvertedCircle from 'src/components/Icon/Times/times-inverted-circle'
import { NamedAvatar } from 'src/components/User'
import { AllReachableUsers } from 'src/components/User/AllReachableUsers/wrapper'
import { User } from 'src/components/User/types'

import { KeyResultTooltipSupportTeam } from './RichTooltips'
import messages from './messages'

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

const ScrollableItem = getScrollableItem()

const EachMember = ({ member, handleUserRemove }: EachMemberProperties) => {
  const intl = useIntl()

  const [isHovering, setIsHovering] = useState(false)
  const setIsHoveringGenerator = (state: boolean) => () => setIsHovering(state)

  return (
    <Stack
      key={member.id}
      alignItems="center"
      cursor="pointer"
      direction="row"
      flexWrap="nowrap"
      marginBottom="1.2em"
      onMouseEnter={setIsHoveringGenerator(true)}
      onMouseLeave={setIsHoveringGenerator(false)}
      onClick={() => handleUserRemove(member.id)}
    >
      <Flex flex={1}>
        <NamedAvatar nameColor="new-gray.800" subtitleType="role" userID={member.id.toString()} />
      </Flex>
      {isHovering && (
        <TimesInvertedCircle
          h="1.2em"
          w="1.2em"
          fill="new-gray.500"
          desc={intl.formatMessage(messages.addPerson)}
        />
      )}
    </Stack>
  )
}

const AddNewMember = ({ handleUserSelect, toggleIsAdding }: AddNewMemberProperties) => {
  const intl = useIntl()

  return (
    <Box>
      <PopoverHeader marginBottom="1em" borderColor="new-gray.400" onClick={toggleIsAdding}>
        <Stack marginBottom="0.5em" alignItems="center" direction="row" cursor="pointer">
          <ChevronLeftCircleIcon
            h="1.3em"
            w="1.3em"
            stroke="none"
            fill="new-gray.700"
            desc="voltar"
          />
          <Text as="span" fontSize="lg" color="new-gray.700" fontWeight="500">
            {intl.formatMessage(messages.supportTeam)}
          </Text>
        </Stack>
      </PopoverHeader>
      <AllReachableUsers onSelect={handleUserSelect} />
    </Box>
  )
}

export const SupportTeamPopover = ({
  supportTeamMembers,
  addUser,
  removeUser,
  ownerName,
}: SupportTeamPopoverProperties) => {
  const intl = useIntl()

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
      <PopoverHeader paddingBottom="1em" marginBottom="1em" borderColor="new-gray.400">
        <TooltipWithRichText tooltip={<KeyResultTooltipSupportTeam />}>
          <Stack alignItems="center" direction="row" cursor="help">
            <Text as="span" fontSize="xl" color="new-gray.900" fontWeight="500">
              {intl.formatMessage(messages.supportTeam)}
            </Text>
            <InfoCircleIcon
              fill="new-gray.900"
              stroke="new-gray.900"
              desc={intl.formatMessage(messages.supportTeam)}
            />
          </Stack>
        </TooltipWithRichText>
        <Text color="new-gray.600">
          {intl.formatMessage(messages.supportTeamDescription, { name: ownerName })}:
        </Text>
      </PopoverHeader>

      <ScrollableItem maxH="250px">
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
            <PlusOutline
              w="1.15em"
              h="1.15em"
              desc={intl.formatMessage(messages.addPerson)}
              stroke={isHoveringAddButton ? 'brand.600' : 'brand.500'}
              fill={isHoveringAddButton ? 'brand.600' : 'brand.500'}
              fontSize="xl"
            />
            <Text color={isHoveringAddButton ? 'brand.600' : 'brand.500'} fontWeight="500">
              {intl.formatMessage(messages.addPerson)}
            </Text>
          </Stack>
        </Box>
      </ScrollableItem>
    </Box>
  )
}
