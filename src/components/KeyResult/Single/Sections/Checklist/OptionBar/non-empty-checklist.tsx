import React from 'react'

import { KeyResultChecklistProgress } from 'src/components/KeyResult/types'

interface NonEmptyChecklistProperties {
  progress?: KeyResultChecklistProgress
}

export const NonEmptyChecklist = ({ progress }: NonEmptyChecklistProperties) => <p>Non Empty</p>
