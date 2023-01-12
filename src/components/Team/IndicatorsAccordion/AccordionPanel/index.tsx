import { AccordionPanel } from '@chakra-ui/react'
import React from 'react'

import IndicatorsTable from '../../IndicatorsTable/wrapper'

const IndicatorsAccordionPanel = () => {
  return (
    <AccordionPanel pb={4}>
      <IndicatorsTable />
    </AccordionPanel>
  )
}

export default IndicatorsAccordionPanel
