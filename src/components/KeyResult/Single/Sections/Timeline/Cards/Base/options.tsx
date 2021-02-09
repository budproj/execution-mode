import { Menu, MenuButton, MenuList, Button } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import TreeDotsIcon from 'src/components/Icon/TreeDots'

import messages from './messages'

export interface KeyResultSectionTimelineCardBaseOptionsProperties {
  onDelete?: () => void
}

const KeyResultSectionTimelineCardBaseOptions = ({
  onDelete,
}: KeyResultSectionTimelineCardBaseOptionsProperties) => {
  const intl = useIntl()

  return (
    <Menu>
      <MenuButton>
        <TreeDotsIcon
          desc={intl.formatMessage(messages.treeDotsIconDesc)}
          fill="gray.300"
          w={4}
          h="auto"
        />
      </MenuButton>
      <MenuList>
        <Button
          color="gray.600"
          p={2}
          w="100%"
          justifyContent="flex-start"
          variant="none"
          _hover={{ bg: 'blue.50', color: 'blue.600' }}
          onClick={onDelete}
        >
          {intl.formatMessage(messages.removeMenuOption)}
        </Button>
      </MenuList>
    </Menu>
  )
}

export default KeyResultSectionTimelineCardBaseOptions
