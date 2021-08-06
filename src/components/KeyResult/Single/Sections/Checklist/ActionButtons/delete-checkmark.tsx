import { useMutation } from '@apollo/client'
import { IconButton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import TimesIcon from 'src/components/Icon/Times'
import { checkMarkIsBeingRemovedAtom } from 'src/state/recoil/key-result/checklist'

import messages from './messages'
import queries from './queries.gql'

interface DeleteCheckMarkButtonProperties {
  checkMarkID?: string
  refresh?: () => void
  isVisible?: boolean
}

export const DeleteCheckMarkButton = ({
  checkMarkID,
  refresh,
  isVisible,
}: DeleteCheckMarkButtonProperties) => {
  isVisible ??= true

  const intl = useIntl()
  const setCheckMarkIsBeingRemoved = useSetRecoilState(checkMarkIsBeingRemovedAtom(checkMarkID))
  const [deleteCheckmark] = useMutation(queries.DELETE_CHECK_MARK, {
    variables: {
      id: checkMarkID,
    },
  })

  const handleDelete = async () => {
    setCheckMarkIsBeingRemoved(true)
    await deleteCheckmark()
    if (refresh) refresh()
  }

  return isVisible ? (
    <IconButton
      aria-label={intl.formatMessage(messages.removeIconDescription)}
      bg="new-gray.600"
      borderRadius="full"
      h="auto"
      minW="auto"
      p={1}
      _hover={{ bg: 'new-gray.800' }}
      icon={
        <TimesIcon
          desc={intl.formatMessage(messages.removeIconDescription)}
          fill="white"
          stroke="white"
          fontSize="xs"
        />
      }
      onClick={handleDelete}
    />
  ) : // eslint-disable-next-line unicorn/no-null
  null
}
