import { useMutation } from '@apollo/client'
import { Checkbox, Stack, Skeleton } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { EditableInputField } from 'src/components/Base'
import {
  KeyResultCheckMark as KeyResultCheckMarkType,
  KeyResultCheckMarkState,
} from 'src/components/KeyResult/types'

import queries from './queries.gql'

interface KeyResultCheckMarkProperties {
  node: Partial<KeyResultCheckMarkType>
  refresh: () => void
}

export const KeyResultCheckMark = ({ node, refresh }: KeyResultCheckMarkProperties) => {
  const [isChecked, setIsChecked] = useState(node?.state === KeyResultCheckMarkState.CHECKED)
  const [toggleCheckMark, { loading }] = useMutation(queries.TOGGLE_CHECK_MARK, {
    variables: {
      id: node?.id,
    },
    onCompleted: (data) => {
      setIsChecked(data.toggleCheckMark.state === KeyResultCheckMarkState.CHECKED)
    },
  })

  const isLoaded = Boolean(node)
  const handleChange = async () => {
    await toggleCheckMark()
    refresh()
  }

  useEffect(() => {
    setIsChecked(node?.state === KeyResultCheckMarkState.CHECKED)
  }, [node?.state, setIsChecked])

  return (
    <Skeleton isLoaded={isLoaded} w="full">
      <Stack direction="row" alignItems="center">
        <Checkbox isChecked={isChecked} isDisabled={loading} onChange={handleChange} />
        <EditableInputField isWaiting={loading} value={node?.description} isLoaded={isLoaded} />
      </Stack>
    </Skeleton>
  )
}
