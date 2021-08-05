import { Checkbox, Skeleton } from '@chakra-ui/react'
import React from 'react'

import { KeyResultCheckMark as KeyResultCheckMarkType } from '../../../../../components/KeyResult/types'

export const KeyResultCheckMark = ({ id, description }: Partial<KeyResultCheckMarkType>) => (
  <Skeleton isLoaded={Boolean(id)}>
    <Checkbox>{description}</Checkbox>
  </Skeleton>
)
