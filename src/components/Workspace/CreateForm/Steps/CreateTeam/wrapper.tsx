import { Box, FormLabel, Input, MenuItemOption, Stack } from '@chakra-ui/react'
import { Field, useFormikContext } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import SelectMenu from '../../../../Base/SelectMenu/select-menu'
import { TEAM_GENDER } from '../../../../Team/constants'
import { CreateWorkspaceFormValues } from '../../wrapper'

import messages from './messages'

export const CreateTeamInWorkspaceFields = () => {
  const intl = useIntl()
  const { values, setFieldValue } = useFormikContext<CreateWorkspaceFormValues>()

  const handleGenderChange = (newGender: string | string[]) => {
    setFieldValue('teamGender', newGender)
  }

  const teamGenderHashmap = {
    [TEAM_GENDER.NEUTRAL]: intl.formatMessage(messages.teamGenderNeutral),
    [TEAM_GENDER.FEMALE]: intl.formatMessage(messages.teamGenderFemale),
    [TEAM_GENDER.MALE]: intl.formatMessage(messages.teamGenderMale),
  }

  return (
    <Stack spacing={8}>
      <Box>
        <FormLabel>{intl.formatMessage(messages.teamNameLabel)}</FormLabel>
        <Field
          autoFocus
          name="teamName"
          placeholder={intl.formatMessage(messages.teamNamePlaceholder)}
          as={Input}
        />
      </Box>

      <Box>
        <FormLabel>{intl.formatMessage(messages.teamGenderLabel)}</FormLabel>
        <SelectMenu
          matchWidth
          placeholder={
            teamGenderHashmap[values.teamGender] ??
            intl.formatMessage(messages.teamGenderPlaceholder)
          }
          value={values.teamGender}
          onChange={handleGenderChange}
        >
          <MenuItemOption value={TEAM_GENDER.NEUTRAL}>
            {teamGenderHashmap[TEAM_GENDER.NEUTRAL]}
          </MenuItemOption>
          <MenuItemOption value={TEAM_GENDER.FEMALE}>
            {teamGenderHashmap[TEAM_GENDER.FEMALE]}
          </MenuItemOption>
          <MenuItemOption value={TEAM_GENDER.MALE}>
            {teamGenderHashmap[TEAM_GENDER.MALE]}
          </MenuItemOption>
        </SelectMenu>
      </Box>
    </Stack>
  )
}
