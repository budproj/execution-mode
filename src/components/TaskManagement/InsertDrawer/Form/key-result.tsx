import { MenuItemOption, Skeleton } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { useTeamKRData } from 'src/components/KeyResult/hooks/use-get-team-key-result'

import SelectMenu from '../../../Base/SelectMenu'

import { FormInputBase } from './base-input'
import { FormValues } from './wrapper'

interface KeyResultInputProperties {
  isLoading?: boolean
}

export const KeyResultInput = ({ isLoading }: KeyResultInputProperties) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const { values, setFieldValue } = useFormikContext<FormValues>()
  const { id: teamId } = router.query
  const { data: KeyResultData } = useTeamKRData(teamId as string, '')

  const handleChange = (newKr: string | string[]) => {
    if (Array.isArray(newKr)) throw new Error('Cannot parse string array')
    setFieldValue('keyResult', newKr)
    handleClose()
  }

  const handleOpen = () => {
    if (!isOpen) setIsOpen(true)
  }

  const handleClose = () => {
    if (isOpen) setIsOpen(false)
  }

  const keyResultTitle = () => {
    if (values.keyResult !== '') {
      const kr = KeyResultData?.find((kr) => kr.id === values.keyResult)
      return kr ? kr.title : 'Selecione um KR'
    }

    return 'Selecione um KR'
  }

  return (
    <FormInputBase title="Resultado-Chave">
      <Skeleton isLoaded={!isLoading}>
        <SelectMenu
          matchWidth
          closeOnSelect
          id="key-result-form"
          isOpen={isOpen}
          value={String(values.keyResult)}
          valueLabel={keyResultTitle()}
          onOpen={handleOpen}
          onClose={handleClose}
          onChange={handleChange}
        >
          <MenuItemOption value="">Selecione um KR</MenuItemOption>
          {KeyResultData?.map((keyResult) => (
            <MenuItemOption key={keyResult.id} value={keyResult.id}>
              {keyResult.title}
            </MenuItemOption>
          ))}
        </SelectMenu>
      </Skeleton>
    </FormInputBase>
  )
}
