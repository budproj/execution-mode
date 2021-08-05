import { Checkbox } from '@chakra-ui/react'
import React from 'react'

import { KeyResultCheckMark as KeyResultCheckMarkType } from '../../../../../components/KeyResult/types'

export const KeyResultCheckMark = ({ id, description }: KeyResultCheckMarkType) => (
  <Checkbox>{description}</Checkbox>
)
