import { useMutation } from '@apollo/client'
import { Stack } from '@chakra-ui/layout'
import { Button, FormControl, FormLabel, FormLabelProps, Spinner } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import {
  KeyResultGoalAndInitialValueFormValues,
  KeyResultGoalAndInitialValueMutationResult,
  KeyResultSingleSectionGoalUpdateFormInterface,
} from './interfaces'
import messages from './messages'
import queries from './queries.gql'

const GoalUpdateFormLabel = (properties: FormLabelProps) => (
  <FormLabel color="gray.500" fontSize="sm" fontWeight={500} {...properties} />
)

export const KeyResultSingleSectionGoalUpdateForm = ({
  keyResultID,
  onCancel,
  onSubmit,
}: KeyResultSingleSectionGoalUpdateFormInterface) => {
  const [keyResult, setKeyResult] = useRecoilState(keyResultAtomFamily(keyResultID))
  const [updateKeyResult, { loading }] = useMutation<KeyResultGoalAndInitialValueMutationResult>(
    queries.UPDATE_KEY_RESULT_GOAL_AND_INITIAL_VALUE,
    {
      onCompleted: (data) => {
        setKeyResult({
          ...keyResult,
          ...data.updateKeyResult,
        })
      },
    },
  )
  const intl = useIntl()

  const Mask = selectMaskBasedOnFormat(keyResult?.format)

  const initialValues: KeyResultGoalAndInitialValueFormValues = {
    initialValue: keyResult?.initialValue,
    goal: keyResult?.goal,
  }

  const handleSubmit = async ({ initialValue, goal }: KeyResultGoalAndInitialValueFormValues) => {
    if (initialValue === keyResult?.initialValue && goal === keyResult?.goal) return

    await updateKeyResult({
      variables: {
        initialValue,
        goal,
        id: keyResultID,
      },
    })

    if (onSubmit) onSubmit({ initialValue, goal })
  }

  const handleCancel = (resetForm: () => void) => () => {
    resetForm()
    if (onCancel) onCancel()
  }

  const handleChange = (
    valueName: string,
    values: KeyResultGoalAndInitialValueFormValues,
    setValues: (values: KeyResultGoalAndInitialValueFormValues) => void,
  ) => (newValue?: string | number | null) => {
    setValues({
      ...values,
      [valueName]: newValue,
    })
  }

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setValues, isSubmitting, resetForm }) => (
        <Form>
          <FormControl id={`key-result-goal-update-${keyResultID?.toString() ?? ''}`}>
            <Stack spacing={4}>
              <Stack spacing={0}>
                <GoalUpdateFormLabel>{intl.formatMessage(messages.firstLabel)}</GoalUpdateFormLabel>
                <Mask
                  value={values.initialValue}
                  fontSize="xs"
                  name="initialValue"
                  handleChange={handleChange('initialValue', values, setValues)}
                />
              </Stack>

              <Stack spacing={0}>
                <GoalUpdateFormLabel>
                  {intl.formatMessage(messages.secondLabel)}
                </GoalUpdateFormLabel>
                <Mask
                  value={values.goal}
                  fontSize="xs"
                  name="goal"
                  handleChange={handleChange('goal', values, setValues)}
                />
              </Stack>

              <Stack direction="row">
                <Button
                  variant="outline"
                  flexGrow={1}
                  colorScheme="brand"
                  flexBasis={0}
                  onClick={handleCancel(resetForm)}
                >
                  {intl.formatMessage(messages.firstButton)}
                </Button>
                <Button
                  isDisabled={isSubmitting || loading}
                  variant="solid"
                  type="submit"
                  flexGrow={1}
                  colorScheme="brand"
                  flexBasis={0}
                >
                  {isSubmitting || loading ? (
                    <Spinner color="brand.500" />
                  ) : (
                    intl.formatMessage(messages.lastButton)
                  )}
                </Button>
              </Stack>
            </Stack>
          </FormControl>
        </Form>
      )}
    </Formik>
  )
}
