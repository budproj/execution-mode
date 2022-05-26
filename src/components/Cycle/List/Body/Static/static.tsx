import { uniqueId } from 'lodash'
import React from 'react'

import { CyclesListBodyProperties } from 'src/components/Cycle/List/Body/body'
import { Cycle } from 'src/components/Cycle/types'

import CyclesBodyStaticLine from './line'

export interface CyclesListBodyStaticProperties extends CyclesListBodyProperties {
  cyclesIDs: Array<Cycle['id']>
}

const CyclesListBody = ({ cyclesIDs, listID, ...rest }: CyclesListBodyStaticProperties) => (
  <>
    {cyclesIDs.map((cyclesID: Cycle['id']) => (
      <CyclesBodyStaticLine
        key={`${listID ?? uniqueId()}_CYCLES_LIST_BODY_LINE_${cyclesID ?? uniqueId()}`}
        cycleID={cyclesID}
        cyclesIDs={cyclesIDs}
        listID={listID}
        {...rest}
      />
    ))}
  </>
)

export default CyclesListBody
