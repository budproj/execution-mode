import { Stack } from '@chakra-ui/react'
import React from 'react'

import { KeyResultChecklistProgress } from 'src/components/KeyResult/types'

import { EmptyChecklist } from './empty-checklist'
import { NonEmptyChecklist } from './non-empty-checklist'

interface OptionBarWrapperProperties {
  progress?: KeyResultChecklistProgress
  keyResultID?: string
  canCreate: boolean
  refresh: () => void
}

export const OptionBarWrapper = ({
  progress,
  keyResultID,
  canCreate,
  refresh,
}: OptionBarWrapperProperties) => (
  <Stack direction="row" flexGrow={1}>
    {progress && progress.total === 0 ? (
      <EmptyChecklist keyResultID={keyResultID} refresh={refresh} canCreate={canCreate} />
    ) : (
      <NonEmptyChecklist progress={progress} />
    )}
  </Stack>
)
