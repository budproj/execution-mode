import { CheckInFormValues } from 'src/components/KeyResult/CheckInForm/form'
import { KeyResultComment } from 'src/components/KeyResult/types'

export interface KeyResultSectionAddCommentInitialValues {
  text: KeyResultComment['text']
}

export interface MentionFieldProperties {
  values: CheckInFormValues
  setValues: (
    values: React.SetStateAction<CheckInFormValues>,
    shouldValidate?: boolean | undefined,
  ) => void
  handleSubmit: (event?: React.FormEvent<HTMLFormElement> | undefined) => void
}
