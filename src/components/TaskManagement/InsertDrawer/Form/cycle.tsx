import { MenuItemOption, Skeleton } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import SelectMenu from '../../../Base/SelectMenu'
import { useGetTeamCycles } from '../../hooks/use-get-team-cycles'

import { FormInputBase } from './base-input'
import { FormValues } from './wrapper'

interface CycleInputProperties {
  isLoading?: boolean
}

export const CycleInput = ({ isLoading }: CycleInputProperties) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const { values, setFieldValue } = useFormikContext<FormValues>()
  const { id: teamId } = router.query
  const { data: cycleData } = useGetTeamCycles(teamId as string)

  const handleChange = (newCycle: string | string[]) => {
    if (Array.isArray(newCycle)) throw new Error('Cannot parse string array')
    setFieldValue('cycle', newCycle)
    handleClose()
  }

  const handleOpen = () => {
    if (!isOpen) setIsOpen(true)
  }

  const handleClose = () => {
    if (isOpen) setIsOpen(false)
  }

  const cycleTitle = () => {
    if (values.cycle !== '') {
      const cycle = cycleData?.find((cycle) => cycle.id === values.cycle)
      return cycle ? cycle.period : 'Selecione um ciclo'
    }

    return 'Selecione um ciclo'
  }

  return (
    <FormInputBase title="Ciclo">
      <Skeleton isLoaded={!isLoading}>
        <SelectMenu
          matchWidth
          closeOnSelect
          id="cycle-form"
          isOpen={isOpen}
          value={String(values.cycle)}
          valueLabel={cycleTitle()}
          onOpen={handleOpen}
          onClose={handleClose}
          onChange={handleChange}
        >
          <MenuItemOption value="">Selecione um ciclo</MenuItemOption>
          {cycleData?.map((cycle) => (
            <MenuItemOption key={cycle.id} value={cycle.id}>
              {cycle.period}
            </MenuItemOption>
          ))}
        </SelectMenu>
      </Skeleton>
    </FormInputBase>
  )
}
