import { useMutation } from '@apollo/client'
import { Box, Button, Flex, HStack, Spinner, useToast } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import { Form, Formik } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import { postCreateTeamSettings } from 'src/state/recoil/routine/post-create-team-settings'

import { LOCALE } from '../../../config'
import { TEAM_GENDER } from '../../Team/constants'
import { USER_GENDER } from '../../User/constants'

import CreateCycle from './Steps/CreateCycle'
import CreateTeam from './Steps/CreateTeam'
import CreateUser from './Steps/CreateUser'
import messages from './messages'
import queries from './queries.gql'

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
  yearlyCycleDateStart: new Date(new Date().getFullYear(), 0, 1).toISOString(),
  yearlyCycleDateEnd: new Date(new Date().getFullYear(), 11, 31).toISOString(),
  quarterlyCyclePeriod: '',
  quarterlyCycleDateStart: new Date(new Date().getFullYear(), 0, 1).toISOString(),
  quarterlyCycleDateEnd: new Date(new Date().getFullYear(), 11, 31).toISOString(),
  optionsAutoInvite: true,
}

export const CreateFormWrapper = () => {
  const intl = useIntl()
  const toast = useToast()
  const createTeamSettings = postCreateTeamSettings()
  const [addConsultant, { loading: addingConsultant }] = useMutation(queries.ADD_CONSULTANT, {
    onCompleted: () => {
      toast({
        status: 'success',
        title: intl.formatMessage(messages.successToastTitle),
      })
    },
  })
  const [createWorkspace, { loading: creatingWorkspace }] = useMutation(queries.CREATE_WORKSPACE, {
    onError: () => {
      toast({
        status: 'error',
        title: intl.formatMessage(messages.errorToastTitle),
      })
    },
    onCompleted: async (data) => {
      void createTeamSettings(data.createWorkspace.id)

      void addConsultant({
        variables: {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          email: `marina+${data.createWorkspace.id}@getbud.co`,
          teamID: data.createWorkspace.id,
        },
      })
    },
  })

  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  })

  const steps = [
    { label: intl.formatMessage(messages.stepOneLabel), Content: CreateTeam },
    { label: intl.formatMessage(messages.stepTwoLabel), Content: CreateUser },
    { label: intl.formatMessage(messages.stepThreeLabel), Content: CreateCycle },
  ]
  const isFirstStep = activeStep === 0
  const isLastStep = activeStep >= steps.length - 1
  const isFinished = activeStep >= steps.length

  const handleSubmit = async (values: CreateWorkspaceFormValues) => {
    const data = {
      team: {
        name: values.teamName,
        gender: values.teamGender,
      },
      user: {
        firstName: values.userFirstName,
        lastName: values.userLastName,
        role: values.userRole,
        gender: values.userGender,
        email: values.userEmail,
        locale: values.userLocale,
      },
      yearlyCycle: {
        period: values.yearlyCyclePeriod,
        dateStart: values.yearlyCycleDateStart,
        dateEnd: values.yearlyCycleDateEnd,
      },
      quarterlyCycle: {
        period: values.quarterlyCyclePeriod,
        dateStart: values.quarterlyCycleDateStart,
        dateEnd: values.quarterlyCycleDateEnd,
      },
      options: {
        autoInvite: values.optionsAutoInvite,
      },
    }

    await createWorkspace({
      variables: {
        data,
      },
    })
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

          {(addingConsultant || creatingWorkspace) && (
            <Flex justifyContent="center">
              <Spinner size="xl" color="brand.500" />
            </Flex>
          )}

          <HStack pt={8} opacity={isFinished ? 0 : 1}>
            <Button isDisabled={isFirstStep} variant="solid" colorScheme="gray" onClick={prevStep}>
              {intl.formatMessage(messages.backButtonLabel)}
            </Button>
            <Box flexGrow={1} />
            {!isLastStep && (
              <Button variant="solid" colorScheme="brand" onClick={nextStep}>
                {intl.formatMessage(messages.forwardButtonLabel)}
              </Button>
            )}
            {
              // We can't join both on a ternary because Formik see them as a single
              // button and, them, it submits the form automatically as soon as the
              // submit button appears on the screen (upon last step start)
              isLastStep && (
                <Button variant="solid" colorScheme="brand" type="submit" onClick={nextStep}>
                  {intl.formatMessage(messages.submitButtonLabel)}
                </Button>
              )
            }
          </HStack>
        </Flex>
      </Form>
    </Formik>
  )
}
