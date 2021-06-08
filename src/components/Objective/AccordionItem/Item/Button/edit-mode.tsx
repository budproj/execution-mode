import { Input } from '@chakra-ui/input'
import { Stack } from '@chakra-ui/layout'
import { FormControl, IconButton, IconButtonProps } from '@chakra-ui/react'
import { Form, Formik, Field } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { objectiveAccordionCollapsedIndexes } from '../../../../../state/recoil/objective/accordion'
import CheckIcon from '../../../../Icon/Check'
import TimesIcon from '../../../../Icon/Times'
import { Objective } from '../../../types'
import { stopAccordionOpen } from '../../handlers'

import messages from './messages'

type EditModeValues = {
  title: string
}

interface EditModeProperties {
  accordionIndex: number
  objective?: Partial<Objective>
  accordionID?: string
}

const EditModeIconButton = (properties: IconButtonProps) => (
  <IconButton
    variant="solid"
    h={12}
    w={12}
    fontSize="2xl"
    bg="black.100"
    color="gray.500"
    {...properties}
  />
)

export const EditMode = ({ objective, accordionID, accordionIndex }: EditModeProperties) => {
  const setObjectiveToCollapsedMode = useSetRecoilState(
    objectiveAccordionCollapsedIndexes(accordionID),
  )
  const intl = useIntl()

  const initialValues: EditModeValues = {
    title: objective?.title ?? '',
  }

  const handleCancel = () => {
    console.log('tag')
    setObjectiveToCollapsedMode(accordionIndex)
  }

  const handleSubmit = async (values: EditModeValues) => {
    console.log(values, 'tag')
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
          <Field name="title" as={Input} />

          <Stack direction="row" spacing={4} alignItems="stretch">
            <EditModeIconButton
              aria-label={intl.formatMessage(messages.cancelButtonDesc)}
              _hover={{
                color: 'red.500',
                bg: 'red.100',
              }}
              onClick={handleCancel}
            >
              <TimesIcon desc={intl.formatMessage(messages.cancelButtonDesc)} fill="currentColor" />
            </EditModeIconButton>

            <EditModeIconButton
              aria-label={intl.formatMessage(messages.submitButtonDesc)}
              type="submit"
              _hover={{
                color: 'green.500',
                bg: 'green.100',
              }}
            >
              <CheckIcon desc={intl.formatMessage(messages.submitButtonDesc)} fill="currentColor" />
            </EditModeIconButton>
          </Stack>
        </FormControl>
      </Form>
    </Formik>
  )
}
