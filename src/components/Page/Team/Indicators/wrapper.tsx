import React from 'react'

import IndicatorsAccordion from 'src/components/Team/IndicatorsAccordion/wrapper'

interface TeamIndicatorsProperties {
  teamID: string
}

export const TeamIndicators = ({ teamID }: TeamIndicatorsProperties) => {
  return <IndicatorsAccordion teamID={teamID} />
}
