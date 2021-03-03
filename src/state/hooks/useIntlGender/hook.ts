import { Dispatch, SetStateAction, useState } from 'react'
import { useIntl } from 'react-intl'

import { USER_GENDER } from 'src/components/User/constants'

import messages from './messages'

type IntlGenderHook = [
  string | undefined,
  Dispatch<SetStateAction<USER_GENDER | undefined>>,
  USER_GENDER | undefined,
]

const useIntlGender = (initialValue?: USER_GENDER): IntlGenderHook => {
  const [genderValue, setGenderValue] = useState(initialValue)
  const intl = useIntl()

  const genderMessageDescriptorHashmap = {
    [USER_GENDER.MALE]: messages.maleGender,
    [USER_GENDER.FEMALE]: messages.femaleGender,
  }

  const messageDescriptor = genderValue ? genderMessageDescriptorHashmap[genderValue] : undefined
  const gender = messageDescriptor ? intl.formatMessage(messageDescriptor) : undefined

  return [gender, setGenderValue, genderValue]
}

export default useIntlGender
