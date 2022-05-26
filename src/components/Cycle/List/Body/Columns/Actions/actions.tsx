import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import CyclesListBodyColumnBase, {
  CyclesListBodyColumnBaseProperties,
} from 'src/components/Cycle/List/Body/Columns/Base'
import { Cycle } from 'src/components/Cycle/types'
import TreeDotsIcon from 'src/components/Icon/TreeDots'

import messages from './messages'

export interface CyclesListBodyColumnActionsProperties extends CyclesListBodyColumnBaseProperties {
  id?: Cycle['id']
}

const CyclesListBodyColumnActions = ({
  id,
}: CyclesListBodyColumnActionsProperties): ReactElement => {
  const intl = useIntl()

  return (
    <CyclesListBodyColumnBase preventLineClick>
      <Menu isLazy placement="auto-end" variant="action-list">
        <MenuButton
          ml={2.5}
          color="new-gray.500"
          _hover={{
            color: 'brand.500',
          }}
        >
          <TreeDotsIcon
            fill="currentColor"
            fontSize="2xl"
            style={{ transform: 'rotate(90deg)' }}
            desc={intl.formatMessage(messages.optionsButtonDesc)}
          />
        </MenuButton>
        <MenuList>
          <MenuItem>{intl.formatMessage(messages.firstMenuItemOption)}</MenuItem>
          <MenuItem>{intl.formatMessage(messages.secondMenuItemOption)}</MenuItem>
        </MenuList>
      </Menu>
    </CyclesListBodyColumnBase>
  )
}

export default CyclesListBodyColumnActions
