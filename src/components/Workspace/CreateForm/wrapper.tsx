import { Box, Button, Flex, HStack } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import { Form, Formik } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import { LOCALE } from '../../../config'
import { TEAM_GENDER } from '../../Team/constants'
import { USER_GENDER } from '../../User/constants'

import CreateCycle from './Steps/CreateCycle'
import CreateTeam from './Steps/CreateTeam'
import CreateUser from './Steps/CreateUser'
import messages from './messages'

export type CreateWorkspaceFormValues = {
  teamName: string
  teamGender: TEAM_GENDER
  userFirstName: string
  userLastName: string
  userRole: string
  userGender: USER_GENDER
  userEmail: string
  userLocale: LOCALE
  yearlyCyclePeriod: string
  yearlyCycleDateStart: string
  yearlyCycleDateEnd: string
  quarterlyCyclePeriod: string
  quarterlyCycleDateStart: string
  quarterlyCycleDateEnd: string
  optionsAutoInvite: boolean
}

const initialValues: CreateWorkspaceFormValues = {
  teamName: '',
  teamGender: TEAM_GENDER.NEUTRAL,
  userFirstName: '',
  userLastName: '',
  userRole: '',
  userGender: USER_GENDER.MALE,
  userEmail: '',
  userLocale: LOCALE['pt-BR'],
  yearlyCyclePeriod: new Date().getFullYear().toString(),
  yearlyCycleDateStart: new Date(new Date().getFullYear(), 0, 1).toString(),
  yearlyCycleDateEnd: new Date(new Date().getFullYear(), 11, 31).toString(),
  quarterlyCyclePeriod: '',
  quarterlyCycleDateStart: new Date(new Date().getFullYear(), 0, 1).toString(),
  quarterlyCycleDateEnd: new Date(new Date().getFullYear(), 11, 31).toString(),
  optionsAutoInvite: true,
}

export const CreateFormWrapper = () => {
  const intl = useIntl()

  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  })

  const steps = [
    { label: intl.formatMessage(messages.stepOneLabel), Content: CreateTeam },
    { label: intl.formatMessage(messages.stepTwoLabel), Content: CreateUser },
    { label: intl.formatMessage(messages.stepThreeLabel), Content: CreateCycle },
  ]
  const isFirstStep = activeStep === 0
  const isLastStep = activeStep === steps.length

  const handleSubmit = (p) => {
    debugger
  }

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
      <Form style={{ width: '100%' }}>
        <Flex flexDir="column" w="full" gridGap={6}>
          <Steps activeStep={activeStep}>
            {steps.map(({ label, Content }) => (
              <Step key={label} label={label}>
                <Content />
              </Step>
            ))}
          </Steps>

          <HStack pt={8}>
            <Button isDisabled={isFirstStep} variant="solid" colorScheme="gray" onClick={prevStep}>
              {intl.formatMessage(messages.backButtonLabel)}
            </Button>
            <Box flexGrow={1} />
            <Button
              variant="solid"
              colorScheme="brand"
              type={isLastStep ? 'submit' : 'button'}
              onClick={nextStep}
            >
              {intl.formatMessage(messages.forwardButtonLabel)}
            </Button>
          </HStack>
        </Flex>
      </Form>
    </Formik>
  )
}
