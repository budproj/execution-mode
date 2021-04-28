import { useMutation } from '@apollo/client'
import { Stack } from '@chakra-ui/layout'
import { Button, FormControl, FormLabel, FormLabelProps } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { selectMaskBasedOnFormat } from 'src/components/KeyResult/NumberMasks/selectors'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import {
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
}: KeyResultSingleSectionGoalUpdateFormInterface) => {
  const [keyResult, setKeyResult] = useRecoilState(keyResultAtomFamily(keyResultID))
  const [updateKeyResult, { loading }] = useMutation<KeyResultGoalAndInitialValueMutationResult>(
    queries.UPDATE_KEY_RESULT_GOAL_AND_INITIAL_VALUE,
  )
  const intl = useIntl()

  const Mask = selectMaskBasedOnFormat(keyResult?.format)

  const initialValues = {
    initialValue: keyResult?.initialValue,
    goal: keyResult?.goal,
  }

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values)
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
  }

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <FormControl id={`key-result-goal-update-${keyResultID?.toString() ?? ''}`}>
            <Stack spacing={4}>
              <Stack spacing={0}>
                <GoalUpdateFormLabel>{intl.formatMessage(messages.firstLabel)}</GoalUpdateFormLabel>
                <Mask value={keyResult?.initialValue} fontSize="xs" name="initialValue" />
              </Stack>

              <Stack spacing={0}>
                <GoalUpdateFormLabel>
                  {intl.formatMessage(messages.secondLabel)}
                </GoalUpdateFormLabel>
                <Mask value={keyResult?.goal} fontSize="xs" name="goal" />
              </Stack>

              <Stack direction="row">
                <Button
                  variant="outline"
                  flexGrow={1}
                  colorScheme="brand"
                  flexBasis={0}
                  onClick={handleCancel}
                >
                  {intl.formatMessage(messages.firstButton)}
                </Button>
                <Button
                  variant="solid"
                  type="submit"
                  flexGrow={1}
                  colorScheme="brand"
                  flexBasis={0}
                >
                  {intl.formatMessage(messages.lastButton)}
                </Button>
              </Stack>
            </Stack>
          </FormControl>
        </Form>
      )}
    </Formik>
  )
}
