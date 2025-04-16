import { Skeleton } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import { KeyResultOwnerSelectMenu } from 'src/components/KeyResult/OwnerSelectMenu/wrapper'

import { FormInputBase } from './base-input'
import messages from './messages'
import { FormValues } from './wrapper'

interface OwnerInputProperties {
  readonly isLoading?: boolean
}

export const OwnerInput = ({ isLoading }: OwnerInputProperties) => {
  const intl = useIntl()
  const { values, setFieldValue } = useFormikContext<FormValues>()

  const handleChange = (newOwnerID: string): void => {
    setFieldValue('owner', newOwnerID)
  }

  return (
    <FormInputBase required title={intl.formatMessage(messages.sixthInputLabel)}>
      <Skeleton isLoaded={!isLoading}>
        <KeyResultOwnerSelectMenu
          isLazy
          value={values.owner}
          avatarSubtitleType="role"
          placement="top"
          onChange={handleChange}
        />
      </Skeleton>
    </FormInputBase>
  )
}
