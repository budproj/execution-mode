import { useMutation } from '@apollo/client'
import { Checkbox, Stack, Skeleton } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { EditableInputField } from 'src/components/Base'

import {
  KeyResultCheckMark as KeyResultCheckMarkType,
  KeyResultCheckMarkState,
} from '../../../../../components/KeyResult/types'

import queries from './queries.gql'

export const KeyResultCheckMark = ({ id, description, state }: Partial<KeyResultCheckMarkType>) => {
  const [isChecked, setIsChecked] = useState(state === KeyResultCheckMarkState.CHECKED)
  const [toggleCheckMark, { loading }] = useMutation(queries.TOGGLE_CHECK_MARK, {
    variables: {
      id,
    },
    onCompleted: (data) => {
      setIsChecked(data.toggleCheckMark.state === KeyResultCheckMarkState.CHECKED)
    },
  })

  const handleChange = async () => {
    void toggleCheckMark()
  }

  useEffect(() => {
    setIsChecked(state === KeyResultCheckMarkState.CHECKED)
  }, [state, setIsChecked])

  return (
    <Skeleton isLoaded={Boolean(id)} w="full">
      <Stack direction="row" alignItems="center">
        <Checkbox isChecked={isChecked} isDisabled={loading} onChange={handleChange} />
        <EditableInputField isWaiting={loading} value={description} isLoaded={Boolean(id)} />
      </Stack>
    </Skeleton>
  )
}
