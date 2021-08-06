import { useMutation } from '@apollo/client'
import { Button } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { PlusOutline } from 'src/components/Icon'
import { draftCheckMarksAtom } from 'src/state/recoil/key-result/checklist'

import messages from '../messages'
import queries from '../queries.gql'

interface NewCheckMarkProperties {
  keyResultID?: string
  label?: string
  refresh: () => void
}

export const CreateCheckMark = ({ label, refresh, keyResultID }: NewCheckMarkProperties) => {
  const intl = useIntl()
  const [draftCheckMarks, setDraftCheckMarks] = useRecoilState(draftCheckMarksAtom(keyResultID))
  const [createCheckMark, { loading }] = useMutation(queries.CREATE_CHECK_MARK, {
    variables: {
      keyResultID,
      description: intl.formatMessage(messages.draftCheckMarkDescription),
    },
    onCompleted: (data) => {
      const newDraftCheckMarks = [...draftCheckMarks, data.createKeyResultCheckMark.id]
      setDraftCheckMarks(newDraftCheckMarks)
    },
  })

  const handleNewCheckMark = async () => {
    await createCheckMark()
    refresh()
  }

  return (
    <Button
      variant="text"
      p={0}
      h="auto"
      colorScheme="brand"
      isDisabled={loading}
      leftIcon={
        <PlusOutline
          desc={intl.formatMessage(messages.newCheckMarkButtonIconDescription)}
          stroke="currentColor"
          fill="currentColor"
          fontSize="xl"
        />
      }
      onClick={handleNewCheckMark}
    >
      {label ?? intl.formatMessage(messages.newCheckMarkButtonLabel)}
    </Button>
  )
}
