import { Accordion, AccordionItem } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React, { useCallback, useState } from 'react'

import { useGetTeamIndicators } from '../IndicatorsTable/hooks/getTeamIndicatorsData/get-team-indicators'
import { Team } from '../types'

import IndicatorsAccordionButton from './AccordionButton'

enum accordionView {
  COLLAPSE = 'COLLAPSE',
  EXPANDED = 'EXPANDED',
}
interface IndicatorsAccordionProperties {
  teamId: Team['id']
}

const DynamicIndicatorsAccordionPanel = dynamic(async () => import('./AccordionPanel'))

const IndicatorsAccordion = ({ teamId }: IndicatorsAccordionProperties) => {
  const { fetchTeamIndicators, loading } = useGetTeamIndicators(teamId)
  const [accordionViewMode, setAccordionViewMode] = useState<accordionView>(accordionView.COLLAPSE)

  const hangleToggleAccordionViewMode = useCallback(async () => {
    if (accordionViewMode === accordionView.COLLAPSE) {
      setAccordionViewMode(accordionView.EXPANDED)
      fetchTeamIndicators()
    }

    if (accordionViewMode === accordionView.EXPANDED) {
      setAccordionViewMode(accordionView.COLLAPSE)
    }
  }, [accordionViewMode, fetchTeamIndicators])

  return (
    <Accordion
      allowToggle
      allowMultiple
      gridGap={8}
      display="flex"
      flexDirection="column"
      onChange={hangleToggleAccordionViewMode}
    >
      <AccordionItem
        borderColor="transparent"
        bg="white"
        boxShadow="for-background.light"
        p={6}
        borderRadius="10"
      >
        <IndicatorsAccordionButton />
        {accordionViewMode === accordionView.EXPANDED && (
          <DynamicIndicatorsAccordionPanel loading={loading} />
        )}
      </AccordionItem>
    </Accordion>
  )
}

export default IndicatorsAccordion
