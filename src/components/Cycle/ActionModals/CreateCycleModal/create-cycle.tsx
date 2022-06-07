import { Flex, Heading, Text, useToast } from '@chakra-ui/react'
import { FormikHelpers } from 'formik'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { Calendar } from 'src/components/Icon'
import { Team } from 'src/components/Team/types'

import { CYCLE_STATUS } from '../../constants'
import { useCreateCycle } from '../../hooks'
import {
  CycleModalForm,
  CycleFormProperties,
  CycleFormValues,
  CycleSelectOption,
  cycleFormInitialValues,
} from '../FormCycle'

import { CreateCycleModalActions } from './actions'
import messages from './messages'

interface CreateCycleProperties {
  teamId?: Team['id']
  initialValues?: Partial<CycleFormProperties>
  cycleParents: CycleSelectOption[]
  onCancel: () => void
}

export const CreateCycle = ({
  teamId,
  initialValues,
  onCancel,
  cycleParents,
}: CreateCycleProperties) => {
  const intl = useIntl()
  const toast = useToast()
  const { createCycle, loading, error, data } = useCreateCycle()

  const handleFormSubmission = async (
    values: CycleFormValues,
    actions: FormikHelpers<CycleFormValues>,
  ) => {
    await createCycle({
      variables: {
        teamId,
        ...values,
        // eslint-disable-next-line unicorn/no-null
        parentId: values.parentId === '' ? null : values.parentId,
        active: values.active === CYCLE_STATUS.ACTIVE,
      },
    })

    actions.resetForm()
  }

  useEffect(() => {
    if (!loading) {
      if (error) {
        toast({
          title: intl.formatMessage(messages.unknownErrorToastMessage),
          status: 'error',
        })
      } else if (data) {
        toast({
          status: 'success',
          title: intl.formatMessage(messages.successToastMessage, {
            period: data.createCycle.period,
          }),
        })
      }
    }
  }, [loading, error, data, toast, intl])

  const normalizedInitialValues: CycleFormValues = {
    ...cycleFormInitialValues,
    ...initialValues,
  }

  return (
    <Flex flexDir="column" gap={12}>
      <Heading display="flex" flexDir="column" justifyContent="center" alignItems="center" gap={2}>
        <Calendar desc="sda" fill="brand.500" fontSize={60} />
        <Text color="gray.500" fontWeight={500} as="h3" fontSize={24}>
          {intl.formatMessage(messages.crateCycleModalTitle)}
        </Text>
        <Text textAlign="center" color="gray.400" fontWeight={400} fontSize={16}>
          {intl.formatMessage(messages.cycleActionModalCreateDesc, {
            breakline: <br />,
          })}
        </Text>
      </Heading>
      <CycleModalForm
        cycleParents={cycleParents}
        initialValues={normalizedInitialValues}
        onSubmit={handleFormSubmission}
      >
        <CreateCycleModalActions onClose={onCancel} />
      </CycleModalForm>
    </Flex>
  )
}
