import { useMutation } from '@apollo/client'
import {
  Input,
  InputGroup,
  Stack,
  FormControl,
  InputRightElement,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import { Form, Formik, Field } from 'formik'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { ObjectiveMode, setObjectiveToMode } from 'src/state/recoil/objective/context'

import { useRecoilFamilyLoader } from '../../../../../state/recoil/hooks'
import { objectiveAtomFamily } from '../../../../../state/recoil/objective'
import { CancelIcon } from '../../../../Icon/Cancel/wrapper'
import { Objective } from '../../../types'
import { stopAccordionOpen } from '../../handlers'

import { CancelButton } from './ActionButtons/cancel-button'
import { ConfirmButton } from './ActionButtons/confirm-button'
import messages from './messages'
import queries from './queries.gql'

type EditModeValues = {
  title: string
}

interface EditModeProperties {
  objective?: Partial<Objective>
}

interface UpdateObjectiveMutationResult {
  updateObjective: Partial<Objective>
}

export const EditMode = ({ objective }: EditModeProperties) => {
  const intl = useIntl()
  const toast = useToast()
  const [loadObjectiveOnRecoil] = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  const [updateObjective, { loading, error }] = useMutation<UpdateObjectiveMutationResult>(
    queries.UPDATE_OBJECTIVE,
    {
      onCompleted: (data) => {
        loadObjectiveOnRecoil(data.updateObjective)
      },
    },
  )
  const setObjectiveToViewMode = useSetRecoilState(setObjectiveToMode(ObjectiveMode.VIEW))

  const initialValues: EditModeValues = {
    title: objective?.title ?? '',
  }

  const handleCancel = () => {
    setObjectiveToViewMode(objective?.id)
  }

  const handleSubmit = async (values: EditModeValues) => {
    await updateObjective({
      variables: {
        objectiveID: objective?.id,
        title: values.title,
      },
    })

    toast({
      title: intl.formatMessage(messages.submitToastMessage),
      status: 'success',
    })

    handleCancel()
  }

  const validateTitle = (value: string): string | undefined => {
    if (value.length === 0) return intl.formatMessage(messages.requiredFieldError)
  }

  useEffect(() => {
    if (error)
      toast({
        title: intl.formatMessage(messages.unexpectedErrorToastMessage),
        status: 'error',
      })
  }, [error, toast, intl])

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ errors }) => (
        <Form
          style={{
            flexGrow: 1,
          }}
        >
          <FormControl
            id={`update-objective-${objective?.id ?? ''}`}
            display="flex"
            flexDirection="row"
            alignItems="center"
            gridGap={8}
            onClick={stopAccordionOpen}
          >
            <InputGroup>
              <Field
                autoFocus
                name="title"
                as={Input}
                validate={validateTitle}
                isInvalid={errors.title}
                // This is required until https://github.com/chakra-ui/chakra-ui/issues/4320 is fixed
                onKeyUp={(event: KeyboardEvent) => event.preventDefault()}
              />
              <InputRightElement h="full" pr={4}>
                {loading && <Spinner color="gray.500" />}
                {errors.title && (
                  <CancelIcon fill="red.500" desc={intl.formatMessage(messages.invalidIconDesc)} />
                )}
              </InputRightElement>
            </InputGroup>

            <Stack direction="row" spacing={4} alignItems="stretch">
              <CancelButton onCancel={handleCancel} />
              <ConfirmButton isLoading={loading} isDisabled={Object.values(errors).length > 0} />
            </Stack>
          </FormControl>
        </Form>
      )}
    </Formik>
  )
}
