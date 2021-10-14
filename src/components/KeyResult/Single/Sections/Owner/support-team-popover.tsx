import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { NamedAvatar } from "src/components/User";
import { User } from "src/components/User/types";

const HelpIcon = () => <>?</>

type SupportTeamPopoverProperties = {
  supportTeamMembers?: User[]
}

export const SupportTeamPopover = ({ supportTeamMembers }: SupportTeamPopoverProperties) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const setToAdding = () => setIsAdding(true)
  const setToNotAdding = () => setIsAdding(false)

  return isAdding ?
    <Box></Box> :
    <Box>
      <Box>
        <Text as="span" fontSize='xl' color="new-gray.900" fontWeight="400">Time de Apoio</Text><HelpIcon/>
      </Box>
      <Box>
        {supportTeamMembers?.map( (member) => (
          <NamedAvatar
            canHover
            nameColor="black.900"
            subtitleType="role"
            userID={member.id.toString()}
          />
        ))}
      </Box>
      <Box onClick={setToAdding}>
        <Text>Adicionar pessoa</Text>
      </Box>
    </Box>
}