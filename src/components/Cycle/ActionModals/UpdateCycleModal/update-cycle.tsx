import { Flex, Heading, Text, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { Calendar } from 'src/components/Icon'
import { Team } from 'src/components/Team/types'
import { cycleAtomFamily } from 'src/state/recoil/cycle'

import { CYCLE_STATUS } from '../../constants'
import { useUpdateCycle } from '../../hooks'
import { Cycle } from '../../types'

import { ParentsSelectProperties, UpdateCycleFormValues, UpdateCycleModalForm } from './Form'
import messages from './messages'

interface UpdateCycleProperties {
  teamId?: Team['id']
  parents: ParentsSelectProperties[]
  cycleId?: Cycle['id']
  onCancel: () => void
}

export const UpdateCycle = ({ teamId, parents, cycleId, onCancel }: UpdateCycleProperties) => {
  const intl = useIntl()
  const toast = useToast()
  const { updateCycle, loading, error, data } = useUpdateCycle()
  const cycle = useRecoilValue(cycleAtomFamily(cycleId))

  const filterdParents = parents.filter((parent) => parent.id !== cycleId)

  const handleFormSubmission = async (values: UpdateCycleFormValues) => {
    await updateCycle({
      variables: {
        cycleId,
        teamId,
        ...values,
        active: values.active === CYCLE_STATUS.ACTIVE,
      },
    })
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
          title: intl.formatMessage(messages.successEditToastMessage, {
            period: data.updateCycle.period,
          }),
        })
      }
    }
  }, [loading, error, data, toast, intl])

  const normalizedInitialValues: UpdateCycleFormValues = {
    ...cycle,
    active: cycle?.active ? CYCLE_STATUS.ACTIVE : CYCLE_STATUS.NOT_ACTIVE,
  }

  return (
    <Flex flexDir="column" gap={12}>
      <Heading display="flex" flexDir="column" justifyContent="center" alignItems="center" gap={2}>
        <Calendar desc="sda" fill="brand.500" fontSize={60} />
        <Text color="gray.500" fontWeight={500} as="h3" fontSize={24}>
          {intl.formatMessage(messages.editCycleModalTitle)}
        </Text>
        <Text textAlign="center" color="gray.400" fontWeight={400} fontSize={16}>
          {intl.formatMessage(messages.cycleActionModalEditDesc, {
            breakline: <br />,
          })}
        </Text>
      </Heading>
      <UpdateCycleModalForm
        parents={filterdParents}
        initialValues={normalizedInitialValues}
        onCancel={onCancel}
        onSubmit={handleFormSubmission}
      />
    </Flex>
  )
}
