import { AccordionPanel } from '@chakra-ui/react'
import React from 'react'

import IndicatorsTable from '../../IndicatorsTable/wrapper'
import { Team } from '../../types'

interface IndicatorsAccordionPanelProperties {
  teamId: Team['id']
}
const IndicatorsAccordionPanel = ({ teamId }: IndicatorsAccordionPanelProperties) => {
  return (
    <AccordionPanel p={0}>
      <IndicatorsTable teamId={teamId} />
    </AccordionPanel>
  )
}

export default IndicatorsAccordionPanel
