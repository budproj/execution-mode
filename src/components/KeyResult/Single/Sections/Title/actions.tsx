import { Flex, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import TreeDotsIcon from 'src/components/Icon/TreeDots'
import { CopyAction } from 'src/components/KeyResult/List/Body/Columns/Actions/copy-action'
import { DeleteAction } from 'src/components/KeyResult/List/Body/Columns/Actions/delete-action'
import { KeyResult } from 'src/components/KeyResult/types'
import { GraphQLEffect } from 'src/components/types'

import messages from './messages'

export interface KrDrawerTitleActionsProperties {
  keyResult?: Partial<KeyResult>
  onDelete?: (id?: string) => void
}

const KrDrawerTitleActions = ({
  keyResult,
  onDelete,
}: KrDrawerTitleActionsProperties): ReactElement => {
  const intl = useIntl()

  const canDelete = keyResult?.policy?.delete === GraphQLEffect.ALLOW

  return (
    <Flex>
      <Menu placement="bottom-end" variant="action-list">
        <MenuButton
          color="new-gray.600"
          _hover={{
            color: 'new-gray.900',
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
          {keyResult?.title && <CopyAction keyResultTitle={keyResult.title} />}
          {canDelete && <DeleteAction id={keyResult.id} onDelete={onDelete} />}
        </MenuList>
      </Menu>
    </Flex>
  )
}

export default KrDrawerTitleActions
