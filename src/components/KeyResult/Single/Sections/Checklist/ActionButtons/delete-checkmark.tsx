import { useMutation } from '@apollo/client'
import { IconButton } from '@chakra-ui/react'
import React, { Ref, useState } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import TrashIcon from 'src/components/Icon/Trash'
import { checkMarkIsBeingRemovedAtom } from 'src/state/recoil/key-result/checklist'

import { EventType } from '../../../../../../state/hooks/useEvent/event-type'
import { Feature } from '../../../../../../state/hooks/useEvent/feature'
import { useEvent } from '../../../../../../state/hooks/useEvent/hook'

import messages from './messages'
import queries from './queries.gql'

interface DeleteCheckMarkButtonProperties {
  keyResultID?: string
  checkMarkID?: string
  onDelete?: () => void
  isVisible?: boolean
  canDelete?: boolean
  buttonRef?: Ref<HTMLButtonElement>
}

export const DeleteCheckMarkButton = ({
  keyResultID,
  checkMarkID,
  onDelete: refresh,
  isVisible,
  canDelete,
  buttonRef,
}: DeleteCheckMarkButtonProperties) => {
  isVisible ??= true

  const { dispatch } = useEvent(EventType.DELETED_KEY_RESULT_CHECK_MARK, {
    feature: Feature.CHECK_MARK,
  })

  const intl = useIntl()
  const setCheckMarkIsBeingRemoved = useSetRecoilState(checkMarkIsBeingRemovedAtom(checkMarkID))
  const [deleteCheckmark] = useMutation(queries.DELETE_CHECK_MARK, {
    refetchQueries: 'active',
    variables: {
      id: checkMarkID,
    },
  })

  const handleDelete = async () => {
    setCheckMarkIsBeingRemoved(true)
    await deleteCheckmark()

    dispatch({
      keyResultID,
      checkMarkID,
    })

    if (refresh) refresh()
  }

  const [isMouseOver, setIsMouseOver] = useState<boolean>(false)
  const onMouseEnter = () => setIsMouseOver(true)
  const onMouseLeave = () => setIsMouseOver(false)

  return canDelete ? (
    <IconButton
      ref={buttonRef}
      aria-label={intl.formatMessage(messages.removeIconDescription)}
      opacity={isVisible ? 1 : 0}
      icon={
        isMouseOver ? (
          <TrashIcon
            h="2em"
            w="2em"
            color="white"
            circleColor="#FF616A"
            desc={intl.formatMessage(messages.removeIconDescription)}
          />
        ) : (
          <TrashIcon h="2em" w="2em" desc={intl.formatMessage(messages.removeIconDescription)} />
        )
      }
      onClick={handleDelete}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    />
  ) : // eslint-disable-next-line unicorn/no-null
  null
}
