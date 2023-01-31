import React from 'react'
import { useIntl } from 'react-intl'

import { Team } from 'src/components/Team/types'

import { TeamSectionHeading } from '../../Section/SectionHeading/wrapper'

import messages from './messages'

interface IndicatorsDownloadCSVProperties {
  teamID: Team['id']
}

const IndicatorsDownloadCSV = ({ teamID }: IndicatorsDownloadCSVProperties) => {
  const intl = useIntl()

  return (
    <TeamSectionHeading fontSize="14px">
      {intl.formatMessage(messages.teamIndicatorsReportDownloadSectionTitle)}
    </TeamSectionHeading>
  )
}

export default IndicatorsDownloadCSV
