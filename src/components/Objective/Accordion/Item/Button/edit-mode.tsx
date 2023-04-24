import { useMutation } from '@apollo/client'
import {
  Input,
  InputGroup,
  FormControl,
  InputRightElement,
  useToast,
  Spinner,
  Textarea,
  Stack,
} from '@chakra-ui/react'
import { Form, Formik, Field, FormikProps } from 'formik'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { ConfirmButton } from 'src/components/Base/EditableControls/confirm-button'
import GuideListCreateOkr from 'src/components/KeyResult/List/Body/GuideListCreateOKR/guide-list-create-okr'
import { ObjectiveViewMode, setObjectiveToMode } from 'src/state/recoil/objective/context'

import { useRecoilFamilyLoader } from '../../../../../state/recoil/hooks'
import { objectiveAtomFamily } from '../../../../../state/recoil/objective'
import { CancelIcon } from '../../../../Icon/Cancel/wrapper'
import { Objective } from '../../../types'
import { stopAccordionOpen } from '../../handlers'

import { CancelButton } from './ActionButtons/cancel-button'
import messages from './messages'
import queries from './queries.gql'

export type EditModeValues = {
  title: string
  description: string
}

interface EditModeProperties {
  objective?: Partial<Objective>
  forwardedRef: React.Ref<FormikProps<EditModeValues>> | undefined
}

interface UpdateObjectiveMutationResult {
  updateObjective: Partial<Objective>
}

export const EditMode = React.forwardRef<typeof Formik<EditModeValues>, EditModeProperties>(
  ({ objective, forwardedRef }) => {
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
    const setObjectiveToFilledMode = useSetRecoilState(setObjectiveToMode(ObjectiveViewMode.FILLED))
    const setObjectiveToViewMode = useSetRecoilState(setObjectiveToMode(ObjectiveViewMode.VIEW))

    const initialValues: EditModeValues = {
      title: objective?.title ?? '',
      description: objective?.description ?? '',
    }

    const handleCancel = () => {
      setObjectiveToViewMode(objective?.id)
    }

    const handleSubmit = async (values: EditModeValues) => {
      await updateObjective({
        variables: {
          objectiveID: objective?.id,
          title: values.title,
          description: values.description,
        },
      })

      setObjectiveToFilledMode(objective?.id)
    }

    const validateTitle = (value: string): string | undefined => {
      if (value.length === 0) return intl.formatMessage(messages.requiredFieldError)
    }

    const validateDescription = (value: string): string | undefined => {
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
      <Formik initialValues={initialValues} innerRef={forwardedRef} onSubmit={handleSubmit}>
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
                    <CancelIcon
                      fill="red.500"
                      desc={intl.formatMessage(messages.invalidIconDesc)}
                    />
                  )}
                </InputRightElement>
              </InputGroup>

              <InputGroup>
                <Field
                  name="description"
                  as={Textarea}
                  placeholder={intl.formatMessage(messages.descriptionPlaceholder)}
                  _placeholder={{ color: 'new-gray.500' }}
                  validate={validateDescription}
                  isInvalid={errors.description}
                  // This is required until https://github.com/chakra-ui/chakra-ui/issues/4320 is fixed
                  onKeyUp={(event: KeyboardEvent) => event.preventDefault()}
                />
                <InputRightElement h="full" pr={4}>
                  {loading && <Spinner color="gray.500" />}
                  {errors.description && (
                    <CancelIcon
                      fill="red.500"
                      desc={intl.formatMessage(messages.invalidIconDesc)}
                    />
                  )}
                </InputRightElement>
              </InputGroup>

              <GuideListCreateOkr />

              <Stack width="100%" direction="row" spacing={4} justifyContent="end">
                <CancelButton onCancel={handleCancel} />
                <ConfirmButton isLoading={loading} isDisabled={Object.values(errors).length > 0} />
              </Stack>
            </FormControl>
          </Form>
        )}
      </Formik>
    )
  },
)
