import { Flex, FormControl } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import { CADENCE, CYCLE_STATUS } from '../../constants'
import { Cycle } from '../../types'

import { CycleTextField, CycleSelectField, CycleDateField } from './Fields'
import { CycleSelectOption } from './Fields/select'
import messages from './messages'
import { NewCycleSchema } from './schema'

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
              <CycleTextField id="period" label={intl.formatMessage(messages.nameCycleField)} />

              <CycleSelectField
                id="active"
                selectedOptionID={values.active}
                label={intl.formatMessage(messages.stateCycleField)}
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
              />

              <CycleDateField
                id="dateStart"
                label={intl.formatMessage(messages.dateStartCycleField)}
              />

              <CycleDateField id="dateEnd" label={intl.formatMessage(messages.dateEndCycleField)} />
            </Flex>

            {children}
          </FormControl>
        </Form>
      )}
    </Formik>
  )
}
