import { KeyResult } from 'src/components/KeyResult/types'

export interface KeyResultSingleSectionGoalUpdateFormInterface {
  keyResultID?: string
  onCancel?: () => void
}

export interface KeyResultGoalAndInitialValueMutationResult {
  updateKeyResult: KeyResult
}
