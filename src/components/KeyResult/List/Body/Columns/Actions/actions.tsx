import { IconButton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'

import { TrashBinOutlineIcon } from '../../../../../Icon/TrashBinOutline/trash-bin-outline'

import messages from './messages'

export interface KeyResultListBodyColumnActionsProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
}

const KeyResultListBodyColumnActions = ({
  id,
}: KeyResultListBodyColumnActionsProperties): ReactElement => {
  const intl = useIntl()

  return (
    <KeyResultListBodyColumnBase preventLineClick justifySelf="flex-end">
      <IconButton
        aria-label={intl.formatMessage(messages.deleteIconDesc)}
        fontSize="lg"
        w={12}
        h={12}
        variant="solid"
        bg="black.100"
        color="gray.500"
        _hover={{
          bg: 'red.500',
          color: 'white',
        }}
      >
        <TrashBinOutlineIcon
          desc={intl.formatMessage(messages.deleteIconDesc)}
          fill="currentColor"
        />
      </IconButton>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnActions
