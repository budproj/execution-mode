import { AccordionPanel } from '@chakra-ui/react'
import React from 'react'

import IndicatorsTable from '../../IndicatorsTable/wrapper'

interface IndicatorsAccordionPanelProperties {
  loading: boolean
}
const IndicatorsAccordionPanel = ({ loading }: IndicatorsAccordionPanelProperties) => {
  return (
    <AccordionPanel p={0}>
      <IndicatorsTable loading={loading} />
    </AccordionPanel>
  )
}

export default IndicatorsAccordionPanel
