import React from 'react'

import { KeyResultChecklistProgress } from 'src/components/KeyResult/types'

interface EmptyChecklistProperties {
  progress?: KeyResultChecklistProgress
}

export const EmptyChecklist = ({ progress }: EmptyChecklistProperties) => <p>Empty</p>
