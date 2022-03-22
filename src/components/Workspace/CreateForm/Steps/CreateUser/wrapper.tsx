import { Box, FormLabel, HStack, Input, MenuItemOption, Stack } from '@chakra-ui/react'
import { Field, useFormikContext } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import { LOCALE } from '../../../../../config'
import SelectMenu from '../../../../Base/SelectMenu/select-menu'
import { USER_GENDER } from '../../../../User/constants'
import { CreateWorkspaceFormValues } from '../../wrapper'

import messages from './messages'

export const CreateUserInWorkspaceFields = () => {
  const intl = useIntl()
  const { values, setFieldValue } = useFormikContext<CreateWorkspaceFormValues>()

  const userGenderHashmap = {
    [USER_GENDER.MALE]: intl.formatMessage(messages.userGenderMaleOption),
    [USER_GENDER.FEMALE]: intl.formatMessage(messages.userGenderFemaleOption),
  }

  const userLocaleHashmap = {
    [LOCALE['pt-BR']]: intl.formatMessage(messages.userLocalePTBROption),
    [LOCALE['en-US']]: intl.formatMessage(messages.userLocaleENUSOption),
  }

  const handleFieldChange = (field: string) => (newGender: string | string[]) => {
    setFieldValue(field, newGender)
  }

  return (
    <Stack spacing={8}>
      <Box>
        <FormLabel>{intl.formatMessage(messages.userFirstNameLabel)}</FormLabel>
        <Field
          autoFocus
          name="userFirstName"
          placeholder={intl.formatMessage(messages.userFirstNamePlaceholder)}
          as={Input}
        />
      </Box>

      <Box>
        <FormLabel>{intl.formatMessage(messages.userLastNameLabel)}</FormLabel>
        <Field
          name="userLastName"
          placeholder={intl.formatMessage(messages.userLastNamePlaceholder)}
          as={Input}
        />
      </Box>

      <Box>
        <FormLabel>{intl.formatMessage(messages.userEmailLabel)}</FormLabel>
        <Field
          name="userEmail"
          placeholder={intl.formatMessage(messages.userEmailPlaceholder)}
          as={Input}
        />
      </Box>

      <Box>
        <FormLabel>{intl.formatMessage(messages.userRoleLabel)}</FormLabel>
        <Field
          name="userRole"
          placeholder={intl.formatMessage(messages.userRolePlaceholder)}
          as={Input}
        />
      </Box>

      <Box>
        <FormLabel>{intl.formatMessage(messages.userGenderLabel)}</FormLabel>
        <SelectMenu
          matchWidth
          placeholder={
            userGenderHashmap[values.userGender] ??
            intl.formatMessage(messages.userGenderPlaceholder)
          }
          value={values.userGender}
          onChange={handleFieldChange('userGender')}
        >
          <MenuItemOption value={USER_GENDER.MALE}>
            {userGenderHashmap[USER_GENDER.MALE]}
          </MenuItemOption>
          <MenuItemOption value={USER_GENDER.FEMALE}>
            {userGenderHashmap[USER_GENDER.FEMALE]}
          </MenuItemOption>
        </SelectMenu>
      </Box>

      <Box>
        <FormLabel>{intl.formatMessage(messages.userLocaleLabel)}</FormLabel>
        <SelectMenu
          matchWidth
          placeholder={
            userLocaleHashmap[values.userLocale] ??
            intl.formatMessage(messages.userLocalePlaceholder)
          }
          value={values.userLocale}
          onChange={handleFieldChange('userLocale')}
        >
          <MenuItemOption value={LOCALE['pt-BR']}>
            {userLocaleHashmap[LOCALE['pt-BR']]}
          </MenuItemOption>
          <MenuItemOption value={LOCALE['en-US']}>
            {userLocaleHashmap[LOCALE['en-US']]}
          </MenuItemOption>
        </SelectMenu>
      </Box>

      <HStack>
        <Field type="checkbox" name="optionsAutoInvite" />
        <FormLabel>{intl.formatMessage(messages.userAutoInviteLabel)}</FormLabel>
      </HStack>
    </Stack>
  )
}
