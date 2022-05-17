import { without } from 'lodash'
import React from 'react'

import CyclesList from 'src/components/Cycle/List'
import { CYCLE_LIST_COLUMN } from 'src/components/Cycle/List/Body/Columns/constants'

const SettingsCycles = () => {
  const columns = without([
    CYCLE_LIST_COLUMN.CYCLE,
    CYCLE_LIST_COLUMN.CADENCE_LEVEL,
    CYCLE_LIST_COLUMN.INITIAL_DATE,
    CYCLE_LIST_COLUMN.END_DATE,
    CYCLE_LIST_COLUMN.STATUS,
    CYCLE_LIST_COLUMN.ACTIONS,
  ]) as CYCLE_LIST_COLUMN[]

  return <CyclesList pt={4} columns={columns} />
}

export default SettingsCycles
