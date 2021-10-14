import { Flex, Popover, PopoverContent, Box, PopoverTrigger } from "@chakra-ui/react";
import React, { useState } from "react";
import { DynamicAvatarGroup } from "src/components/Base";
import PlusIcon from "src/components/Icon/Plus";
import { KeyResultSectionHeading } from "../Heading/wrapper";

import { User } from "src/components/User/types";
import { SupportTeamPopover } from "./support-team-popover";

type SupportTeamFieldProperties = {
  supportTeamMembers?: User[]
  canUpdate?: boolean
}


export const SupportTeamField = ({ supportTeamMembers, canUpdate }: SupportTeamFieldProperties) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => canUpdate && setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  const handleUpdate = () => {
    handleClose()
  }

  const [isHovering, setIsHovering] = useState(false)
  const handleMouseEnter = () => canUpdate && setIsHovering(true)
  const handleMouseLeave = () => canUpdate && setIsHovering(false)

  const isLoaded = Boolean(supportTeamMembers)

  return <>
    <Popover
      isLazy
      placement="bottom-start"
      isOpen={isOpen}
      size="md"
      onOpen={handleOpen}
      onClose={handleClose}
    >
      <KeyResultSectionHeading>Time de Apoio</KeyResultSectionHeading>
      <PopoverTrigger>
        <Flex direction="row" flexWrap="nowrap" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <DynamicAvatarGroup
                users={supportTeamMembers || []}
                isLoaded={isLoaded}
              />
              {isLoaded && <>
                <Flex
                  w={12}
                  h={12}
                  justifyContent="center"
                  alignItems="center"
                  background='new-gray.200'
                  borderColor={isHovering ? 'brand.500' : 'new-gray.500'}
                  borderRadius="full"
                  borderWidth={2}
                  borderStyle="dashed"
                >
                  <PlusIcon
                    scale={0.1}
                    fill={isHovering ? 'brand.500' : 'new-gray.500'}
                    desc="adicionar time suporte"
                  />
                </Flex>
                {!supportTeamMembers?.length  ? 'Adicionar' : ''}
              </>}
          </Flex>
        </PopoverTrigger>
      <PopoverContent width="md" h="full" overflow="hidden">
        <SupportTeamPopover supportTeamMembers={supportTeamMembers}/>
      </PopoverContent>
    </Popover>
  </>
}