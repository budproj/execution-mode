import { Flex, FormControl } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import { TextField } from 'src/components/Base/Form/Fields/text'
import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import InfoCircleIcon from 'src/components/Icon/InfoCircle'

import { CADENCE, CYCLE_STATUS } from '../../constants'
import { Cycle } from '../../types'

import { CycleSelectField, CycleDateField } from './Fields'
import { CycleSelectOption } from './Fields/select'
import messages from './messages'
import { NewCycleSchema } from './schema'

export enum ModalType {
  UPDATE = 'update',
  CREATE = 'create',
}

export type CycleFormValues = {
  parentId?: string
  period?: Cycle['period']
  cadence?: Cycle['cadence']
  dateStart?: Cycle['dateStart']
  dateEnd?: Cycle['dateEnd']
  active?: CYCLE_STATUS
}

export type CycleFormProperties = {
  initialValues?: CycleFormValues
  cycleParents: CycleSelectOption[]
  modalType?: ModalType
  children?: React.ReactNode
  onSubmit: (values: CycleFormValues, actions: FormikHelpers<CycleFormValues>) => Promise<void>
}

export const defaultInitialValues: CycleFormValues = {
  parentId: undefined,
  period: undefined,
  cadence: undefined,
  dateStart: undefined,
  dateEnd: undefined,
  active: undefined,
}

export const CycleModalForm = ({
  initialValues = defaultInitialValues,
  cycleParents,
  modalType,
  onSubmit,
  children,
}: CycleFormProperties) => {
  const intl = useIntl()

  return (
    <Formik initialValues={initialValues} validationSchema={NewCycleSchema} onSubmit={onSubmit}>
      {({ values }) => (
        <Form>
          <FormControl id={`create-cycle''}`}>
            <Flex columnGap={8} rowGap={5} flexWrap="wrap" mb={8}>
              <TextField
                fieldId="period"
                label={intl.formatMessage(messages.nameCycleField)}
                maxW={180}
              />

              <CycleSelectField
                id="active"
                selectedOptionID={values.active}
                label={
                  modalType === ModalType.CREATE
                    ? intl.formatMessage(messages.stateCycleFieldOnCreateCycle)
                    : intl.formatMessage(messages.stateCycleFieldOnUpdateCycle)
                }
                options={[
                  {
                    id: CYCLE_STATUS.ACTIVE,
                    label: intl.formatMessage(messages.activeCycleOption),
                  },
                  {
                    id: CYCLE_STATUS.NOT_ACTIVE,
                    label: intl.formatMessage(messages.notActiveCycleOption),
                  },
                ]}
              />

              <CycleSelectField
                id="cadence"
                selectedOptionID={values.cadence}
                label={intl.formatMessage(messages.cadenceCycleField)}
                options={[
                  {
                    id: CADENCE.QUARTERLY,
                    label: intl.formatMessage(messages.quarterlyCadenceCycleOption),
                  },
                  {
                    id: CADENCE.YEARLY,
                    label: intl.formatMessage(messages.yearlyCadenceCycleOption),
                  },
                ]}
              />

              <CycleSelectField
                id="parentId"
                selectedOptionID={values.parentId}
                label={intl.formatMessage(messages.parenteCycleField)}
                options={cycleParents}
                isDisabled={values.cadence === CADENCE.YEARLY}
                Tooltip={() => (
                  <TooltipWithDelay
                    label={intl.formatMessage(messages.parentCycleTooltip)}
                    placement="top"
                    maxWidth="container.md"
                  >
                    <Flex transform="translateY(2px)">
                      <InfoCircleIcon
                        fill="new-gray.600"
                        stroke="new-gray.600"
                        cursor="help"
                        desc={intl.formatMessage(messages.parentCycleTooltip)}
                      />
                    </Flex>
                  </TooltipWithDelay>
                )}
              />
              <Flex w="100%" gap={8}>
                <CycleDateField
                  fieldId="dateStart"
                  maxW={180}
                  label={intl.formatMessage(messages.dateStartCycleField)}
                />

                <CycleDateField
                  fieldId="dateEnd"
                  maxW={180}
                  label={intl.formatMessage(messages.dateEndCycleField)}
                />
              </Flex>
            </Flex>

            {children}
          </FormControl>
        </Form>
      )}
    </Formik>
  )
}
