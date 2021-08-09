import { useMutation } from '@apollo/client'
import { Button } from '@chakra-ui/react'
import React, { Ref } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { PlusOutline } from 'src/components/Icon'
import { draftCheckMarksAtom } from 'src/state/recoil/key-result/checklist'

import messages from './messages'
import queries from './queries.gql'

interface CreateCheckMarkButtonProperties {
  keyResultID?: string
  label?: string
  onCreate: () => void
  createButtonReference?: Ref<HTMLButtonElement>
}

export const CreateCheckMarkButton = ({
  label,
  keyResultID,
  createButtonReference,
  onCreate,
}: CreateCheckMarkButtonProperties) => {
  const intl = useIntl()
  const [draftCheckMarks, setDraftCheckMarks] = useRecoilState(draftCheckMarksAtom(keyResultID))
  const [createCheckMark, { loading }] = useMutation(queries.CREATE_CHECK_MARK, {
    onCompleted: (data) => {
      const newDraftCheckMarks = [...draftCheckMarks, data.createKeyResultCheckMark.id]
      setDraftCheckMarks(newDraftCheckMarks)

      if (onCreate) onCreate()
    },
  })

  const handleNewCheckMark = async () => {
    await createCheckMark({
      variables: {
        keyResultID,
        description: '',
      },
    })
  }

  return (
    <Button
      ref={createButtonReference}
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