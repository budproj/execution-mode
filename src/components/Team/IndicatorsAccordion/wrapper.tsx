import { Accordion, AccordionItem } from '@chakra-ui/react'
import React from 'react'

import { Team } from '../types'

import IndicatorsAccordionButton from './AccordionButton'
import IndicatorsAccordionPanel from './AccordionPanel'

interface IndicatorsAccordionProperties {
  teamID: Team['id']
}

const IndicatorsAccordion = ({ teamID }: IndicatorsAccordionProperties) => {
  return (
    <Accordion allowToggle allowMultiple gridGap={8} display="flex" flexDirection="column">
      <AccordionItem>
        <IndicatorsAccordionButton />
        <IndicatorsAccordionPanel />
      </AccordionItem>
    </Accordion>
  )
}

export default IndicatorsAccordion
