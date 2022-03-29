import { Stack } from '@chakra-ui/react'
import React from 'react'

import { KeyResultChecklistProgress } from 'src/components/KeyResult/types'

import { EmptyChecklist } from './empty-checklist'
import { NonEmptyChecklist } from './non-empty-checklist'

interface OptionBarWrapperProperties {
  progress?: KeyResultChecklistProgress
  keyResultID?: string
  canCreate: boolean
  onCreate: () => void
}

export const OptionBarWrapper = ({
  progress,
  keyResultID,
  canCreate,
  onCreate,
}: OptionBarWrapperProperties) => (
  <Stack direction="row" flexGrow={1} textAlign="right">
    {progress && progress.total === 0 ? (
      <EmptyChecklist keyResultID={keyResultID} canCreate={canCreate} onCreate={onCreate} />
    ) : (
      <NonEmptyChecklist progress={progress} />
    )}
  </Stack>
)
