import { defineMessages } from 'react-intl'

type TeamIndicatorsReportDownloadMessages =
  | 'teamIndicatorsReportDownloadSectionTitle'
  | 'weekellyReportOptionMessage'
  | 'downloadReportCSVButtonMessage'
  | 'colaboratorColumnTitle'
  | 'lastAccessColumnTitle'
  | 'keyResultsColumnTitle'
  | 'latestCheckInDateColumnTitle'
  | 'confidenceColumnTitle'
  | 'progressColumnTitle'
  | 'deltaColumnTitle'
  | 'checkListsColumnTitle'
  | 'feelingColumnTitle'
  | 'productivityColumnTitle'
  | 'roadBlockColumnTitle'
  | 'noKRMessage'
  | 'noRoutineAnswerMessage'
  | 'noCheckInMessage'
  | 'noAccessMessage'
  | 'isLoadingDownloadButtonText'

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

  colaboratorColumnTitle: {
    defaultMessage: 'COLABORADOR',
    id: 'lIb14q',
    description: 'The title of the colaborator column.',
  },

  lastAccessColumnTitle: {
    defaultMessage: 'ÚLTIMO ACESSO',
    id: 'awPBSY',
    description: 'The title of the lastAccess column.',
  },

  keyResultsColumnTitle: {
    defaultMessage: 'RESULTADOS-CHAVE',
    id: 'iXbJc5',
    description: 'The title of the keyResults column.',
  },

  latestCheckInDateColumnTitle: {
    defaultMessage: 'ÚLTIMO CHECK-IN',
    id: 'LavvSV',
    description: 'The title of the latestCheckInDate column.',
  },

  confidenceColumnTitle: {
    defaultMessage: 'CONFIANÇA',
    id: 'L2l/Rw',
    description: 'The title of the confidence column.',
  },

  progressColumnTitle: {
    defaultMessage: 'PROGRESSO',
    id: 'Joj9R9',
    description: 'The title of the progress column.',
  },

  deltaColumnTitle: {
    defaultMessage: 'EVOLUÇÃO',
    id: 'vERqrq',
    description: 'The title of the delta column.',
  },

  checkListsColumnTitle: {
    defaultMessage: 'CHECK-LISTS',
    id: '2FcRLo',
    description: 'The title of the checkLists column.',
  },

  feelingColumnTitle: {
    defaultMessage: 'RETROSPECTIVA SENTIMENTO',
    id: '4QPhgQ',
    description: 'The title of the feeling column.',
  },

  productivityColumnTitle: {
    defaultMessage: 'RETROSPECTIVA PRODUTIVIDADE',
    id: 'sp7xYz',
    description: 'The title of the productivity column.',
  },
  roadBlockColumnTitle: {
    defaultMessage: 'RETROSPECTIVA BLOQUEIO',
    id: 'LeHFjM',
    description: 'The title of the roadBlock column.',
  },
  noKRMessage: {
    defaultMessage: 'Sem KR',
    id: 'tp3vDN',
    description: 'The message returned if the user has no key result.',
  },
  noRoutineAnswerMessage: {
    defaultMessage: 'Sem Resposta',
    id: 'UHVzDU',
    description: 'The message returned if the user has no routine answer.',
  },
  noCheckInMessage: {
    defaultMessage: 'Sem check-in',
    id: 'ot1J/+',
    description: 'The message returned if the user has no check-in',
  },
  noAccessMessage: {
    defaultMessage: 'Sem acesso',
    id: '2vOg9s',
    description: "The message returned if the user didn't access Bud yet.",
  },

  isLoadingDownloadButtonText: {
    defaultMessage: 'Carregando...',
    id: 'Du7aqJ',
    description: 'The message in the download button when the CSV is loading',
  },
})
