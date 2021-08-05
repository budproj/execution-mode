import { Stack } from '@chakra-ui/react'
import React from 'react'

import { KeyResultChecklistProgress } from 'src/components/KeyResult/types'

import { EmptyChecklist } from './empty-checklist'
import { NonEmptyChecklist } from './non-empty-checklist'

interface OptionBarWrapperProperties {
  progress?: KeyResultChecklistProgress
  keyResultID?: string
  refresh: () => void
}

export const OptionBarWrapper = ({
  progress,
  keyResultID,
  refresh,
}: OptionBarWrapperProperties) => (
  <Stack direction="row" flexGrow={1}>
    {progress && progress.total === 0 ? (
      <EmptyChecklist keyResultID={keyResultID} refresh={refresh} />
    ) : (
      <NonEmptyChecklist progress={progress} />
    )}
  </Stack>
)
