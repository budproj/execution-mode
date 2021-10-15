import { Box, PopoverFooter, PopoverHeader, Stack, Text } from "@chakra-ui/react";
import React, { ReactChildren, useState } from "react";
import { TooltipWithRichText } from "src/components/Base";
import InfoCircleIcon from "src/components/Icon/InfoCircle";
import { NamedAvatar } from "src/components/User";
import { AllReachableUsers } from "src/components/User/AllReachableUsers/wrapper";
import { User } from "src/components/User/types";
import { KeyResultTooltipSupportTeam } from "./RichTooltips";


const BackIcon = () => <>?</>

type SupportTeamPopoverProperties = {
  supportTeamMembers?: User[]
}

type AddNewMemberProperties = {
  handleUserSelect: (userID: string) => void
  toggleIsAdding: () => void
}

const AddNewMember = ({ handleUserSelect, toggleIsAdding }: AddNewMemberProperties) =>
  <Box>
    <PopoverHeader onClick={toggleIsAdding}>
      <BackIcon />
      <Text as="span" fontSize='lg' color="new-gray.900" fontWeight="400">Time de Apoio</Text>
    </PopoverHeader>
    <AllReachableUsers onSelect={handleUserSelect} />
  </Box>

export const SupportTeamPopover = ({ supportTeamMembers }: SupportTeamPopoverProperties) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const toggleIsAdding = () => setIsAdding(!isAdding)

  const handleUserSelect = () => {
    // TODO: add userID: string to supportTeamMembers
    toggleIsAdding()
  }

  const owner = 'Aline'

  return isAdding ?
    <AddNewMember handleUserSelect={handleUserSelect} toggleIsAdding={toggleIsAdding}/> :
    <Box>
      <PopoverHeader>
        <TooltipWithRichText tooltip={<KeyResultTooltipSupportTeam />}>
          <Stack alignItems="center" direction="row" cursor="help">
            <Text as="span" fontSize='xl' color="new-gray.900" fontWeight="400">Time de Apoio</Text>
            <InfoCircleIcon
              fill="gray.300"
              stroke="gray.400"
              desc='Um círculo com um ponto de interrogação ao centro'
            />
          </Stack>
        </TooltipWithRichText>
        <Text color="new-gray.600">Essas são as pessoas ajudando {owner} neste resultado-chave:</Text>
      </PopoverHeader>
      <Box>
        {supportTeamMembers?.map( (member) => (
          <NamedAvatar
            nameColor="new-gray.800"
            subtitleType="role"
            userID={member.id.toString()}
          />
        ))}
      </Box>
      <PopoverFooter onClick={toggleIsAdding}>
        <Text>Adicionar pessoa</Text>
      </PopoverFooter>
    </Box>
}