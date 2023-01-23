import { Accordion, AccordionItem } from '@chakra-ui/react'
import React from 'react'

import { Team } from '../types'

import IndicatorsAccordionButton from './AccordionButton'
import IndicatorsAccordionPanel from './AccordionPanel'

interface IndicatorsAccordionProperties {
  teamId: Team['id']
}

const IndicatorsAccordion = ({ teamId }: IndicatorsAccordionProperties) => {
  return (
    <Accordion allowToggle allowMultiple gridGap={8} display="flex" flexDirection="column">
      <AccordionItem
        borderColor="transparent"
        bg="white"
        boxShadow="for-background.light"
        p={6}
        borderRadius="10"
      >
        <IndicatorsAccordionButton />
        <IndicatorsAccordionPanel teamId={teamId} />
      </AccordionItem>
    </Accordion>
  )
}

export default IndicatorsAccordion
