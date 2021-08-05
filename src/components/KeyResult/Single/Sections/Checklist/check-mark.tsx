import {
  Checkbox,
  Stack,
  Editable,
  EditablePreview,
  EditableInput,
  Skeleton,
} from '@chakra-ui/react'
import React from 'react'

import { KeyResultCheckMark as KeyResultCheckMarkType } from '../../../../../components/KeyResult/types'

export const KeyResultCheckMark = ({ id, description }: Partial<KeyResultCheckMarkType>) => (
  <Skeleton isLoaded={Boolean(id)} w="full">
    <Stack direction="row" alignItems="center">
      <Checkbox />
      <Editable value={description} w="full">
        <EditablePreview />
        <EditableInput />
      </Editable>
    </Stack>
  </Skeleton>
)
