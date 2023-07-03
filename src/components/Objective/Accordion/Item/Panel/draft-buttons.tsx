import { Button, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import ConfirmPublishingDialog from 'src/components/Objective/OKRsPublishingFlow/ConfirmPublishingDialog/confirm-publishing-dialog'
import { AUTHZ_ROLES } from 'src/state/recoil/authz/constants'
import { keyResultInsertDrawerObjectiveID } from 'src/state/recoil/key-result/drawers/insert/objective-id'
import meAtom from 'src/state/recoil/user/me'
import selectUser from 'src/state/recoil/user/selector'

import { stopAccordionOpen } from '../../handlers'

import messages from './messages'

export interface DraftButtonsProperties {
  objectiveID?: string
  isObjectiveWithKeyResults?: boolean
}

export const DraftButtons = ({
  objectiveID,
  isObjectiveWithKeyResults = false,
}: DraftButtonsProperties) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const intl = useIntl()

  const myID = useRecoilValue(meAtom)
  const user = useRecoilValue(selectUser(myID))

  const setKeyResultInsertDrawerObjectiveID = useSetRecoilState(keyResultInsertDrawerObjectiveID)

  const canPublishOKR = user?.authzRole?.name !== AUTHZ_ROLES.TEAM_MEMBER

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setKeyResultInsertDrawerObjectiveID(objectiveID)
    stopAccordionOpen(event)
  }

  return (
    <>
      <Flex
        width="100%"
        alignSelf="flex-end"
        alignItems="flex-end"
        justifyContent="flex-end"
        paddingTop="24px"
        borderTop={isObjectiveWithKeyResults ? undefined : '1px'}
        borderColor="new-gray.400"
      >
        <Button
          as="button"
          marginRight="10px"
          padding="10px"
          bg="brand.500"
          _hover={{ background: 'brand.400', color: 'black.50' }}
          color="white"
          onClick={handleClick}
        >
          {intl.formatMessage(messages.createKeyResultButtonLabelMessage)}
        </Button>
        <Button
          isDisabled={!canPublishOKR || !isObjectiveWithKeyResults}
          padding="10px"
          bg="green.500"
          _hover={{ background: 'green.400', color: 'black.50' }}
          color="white"
          onClick={() => setIsDialogOpen(true)}
        >
          {intl.formatMessage(messages.publishOkrButtonLabelMessage)}
        </Button>
      </Flex>
      <ConfirmPublishingDialog
        isOpen={isDialogOpen}
        objectiveID={objectiveID}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  )
}
