import { defineMessages } from 'react-intl'

type TeamIndicatorsReportDownloadMessages =
  | 'teamIndicatorsReportDownloadSectionTitle'
  | 'weekellyReportOptionMessage'
  | 'downloadReportCSVButtonMessage'

export default defineMessages<TeamIndicatorsReportDownloadMessages>({
  teamIndicatorsReportDownloadSectionTitle: {
    defaultMessage: 'Exportar relatório do time',
    id: 'g9n6ja',
    description:
      'This message is the title of the team Indicators Download Report within a team page.',
  },

  weekellyReportOptionMessage: {
    defaultMessage:
      'Relatório {interval, select, current {semanal} quartely {trimestral} other {}}',
    id: 'VmMAw2',
    description: 'This message is the title of the selected range for team Indicators Download.',
  },

  downloadReportCSVButtonMessage: {
    defaultMessage: 'Download CSV',
    id: 'l3DqHa',
    description: 'This message is the title of download team report button.',
  },
})
