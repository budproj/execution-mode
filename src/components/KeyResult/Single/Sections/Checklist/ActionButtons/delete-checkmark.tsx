import { useMutation } from '@apollo/client'
import React, { Ref } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { DeleteButton } from 'src/components/Base/Button/delete-button'
import myTasksQueries from 'src/components/Page/MyThings/ActiveCycles/my-tasks/queries.gql'
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
  className?: string
}

export const DeleteCheckMarkButton = ({
  keyResultID,
  checkMarkID,
  onDelete: refresh,
  isVisible,
  canDelete,
  ...rest
}: DeleteCheckMarkButtonProperties) => {
  isVisible ??= true

  const { dispatch } = useEvent(EventType.DELETED_KEY_RESULT_CHECK_MARK, {
    feature: Feature.CHECK_MARK,
  })

  const intl = useIntl()
  const setCheckMarkIsBeingRemoved = useSetRecoilState(checkMarkIsBeingRemovedAtom(checkMarkID))
  const [deleteCheckmark] = useMutation(queries.DELETE_CHECK_MARK, {
    refetchQueries: [myTasksQueries.GET_KRS_WITH_MY_CHECKMARKS],
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

  return canDelete ? (
    <DeleteButton
      canDelete={canDelete}
      description={intl.formatMessage(messages.removeIconDescription)}
      isVisible={isVisible}
      onDelete={handleDelete}
      {...rest}
    />
  ) : // eslint-disable-next-line unicorn/no-null
  null
}
