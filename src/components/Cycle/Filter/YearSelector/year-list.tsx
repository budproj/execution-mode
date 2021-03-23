import { MenuItemOption, MenuOptionGroup } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { CycleOption } from 'src/components/Cycle/Filter/filter'
import { Cycle } from 'src/components/Cycle/types'

import messages from './messages'

export interface CycleFilterYearSelectorYearListProperties {
  onFilter: (cycleIDs: Array<Cycle['id']>) => void
  cycles?: CycleOption[]
}

const CycleFilterYearSelectorYearList = ({
  cycles,
  onFilter,
}: CycleFilterYearSelectorYearListProperties) => {
  const intl = useIntl()

  const handleChange = (cycleIDs: string | string[]) => {
    cycleIDs = Array.isArray(cycleIDs) ? cycleIDs : [cycleIDs]
    onFilter(cycleIDs)
  }

  return cycles ? (
    <MenuOptionGroup type="checkbox" onChange={handleChange}>
      {cycles.map((cycle) => (
        <MenuItemOption key={cycle.id} value={cycle.id} fontSize="sm">
          {cycle.period}
        </MenuItemOption>
      ))}
    </MenuOptionGroup>
  ) : (
    <MenuItemOption isDisabled>{intl.formatMessage(messages.emptyListLabel)}</MenuItemOption>
  )
}

export default CycleFilterYearSelectorYearList
