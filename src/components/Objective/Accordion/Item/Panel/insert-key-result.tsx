import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { keyResultInsertDrawerObjectiveID } from '../../../../../state/recoil/key-result/drawers/insert/objective-id'
import PlusOutlineIcon from '../../../../Icon/PlusOutline'
import { stopAccordionOpen } from '../../handlers'

import messages from './messages'

interface InsertKeyResultButtonProperties {
  objectiveID?: string
}

export const InsertKeyResultButton = ({ objectiveID }: InsertKeyResultButtonProperties) => {
  const setKeyResultInsertDrawerObjectiveID = useSetRecoilState(keyResultInsertDrawerObjectiveID)
  const intl = useIntl()

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setKeyResultInsertDrawerObjectiveID(objectiveID)
    stopAccordionOpen(event)
  }

  return (
    <Box pt={4} pb={2} borderTopWidth={1} borderColor="black.200">
      <Button
        p={0}
        leftIcon={
          <PlusOutlineIcon
            desc={intl.formatMessage(messages.insertButtonIconDesc)}
            stroke="currentColor"
            fill="currentColor"
          />
        }
        colorScheme="brand"
        onClick={handleClick}
      >
        {intl.formatMessage(messages.insertButtonLabel)}
      </Button>
    </Box>
  )
}
