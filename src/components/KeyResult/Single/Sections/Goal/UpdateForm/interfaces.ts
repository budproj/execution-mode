import { KeyResult } from 'src/components/KeyResult/types'

export interface KeyResultSingleSectionGoalUpdateFormInterface {
  keyResultID?: string
  onCancel?: () => void
  onSubmit?: (values: KeyResultGoalAndInitialValueFormValues) => void
}

export interface KeyResultGoalAndInitialValueMutationResult {
  updateKeyResult: KeyResult
}

export interface KeyResultGoalAndInitialValueFormValues {
  initialValue?: number
  goal?: number
}
