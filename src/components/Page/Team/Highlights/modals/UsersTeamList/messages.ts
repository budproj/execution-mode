import { defineMessages } from 'react-intl'

type UsersTeamListMessages =
  | 'feelingTitle'
  | 'lowProductivityTitle'
  | 'roadblockTitle'
  | 'userColumn'
  | 'teamColumn'
  | 'modalTitleColumn'
  | 'lastRoutineColumn'
  | 'lastAccessColumn'
  | 'suitcaseIconDescription'
  | 'pauseIconDescription'
  | 'productivityLabel'
  | 'feelingLabel'
  | 'roadblockLabel'
  | 'noKrsFlag'

export default defineMessages<UsersTeamListMessages>({
  feelingTitle: {
    defaultMessage: 'Sentimento',
    id: 'v9xuBO',
    description: 'The title in the feeling modal',
  },
  lowProductivityTitle: {
    defaultMessage: 'Baixa produtividade',
    id: '4JN6AF',
    description: 'The title in the low productivity modal',
  },
  roadblockTitle: {
    defaultMessage: 'Bloqueio',
    id: 'CoBhGc',
    description: 'The title in the roadblock modal',
  },
  feelingLabel: {
    defaultMessage: 'Sentimento',
    id: 'ObeR3M',
    description: 'The feeling tooltip label.',
  },
  productivityLabel: {
    defaultMessage: 'Produtividade',
    id: 'XD8spZ',
    description: 'The productivity tooltip label.',
  },
  roadblockLabel: {
    defaultMessage: 'Bloqueio',
    id: 'XgYpmY',
    description: 'The roadblock tooltip label.',
  },
  userColumn: {
    defaultMessage: 'Usuário',
    id: 'C+pEn4',
    description: 'The title of the user column',
  },
  teamColumn: {
    defaultMessage: 'Time',
    id: 'cVQ/Xo',
    description: 'The title of the team column',
  },
  modalTitleColumn: {
    defaultMessage:
      '{type, select, feeling {Sentimento} productivity {Produtividade na semana} roadblock {Bloqueios na semana} other {OKRs}} ',
    id: 'EJLLb9',
    description: 'The title of the modal',
  },
  lastRoutineColumn: {
    defaultMessage: 'Última retrospectiva',
    id: 'ktxOrA',
    description: 'The title of the last routine column',
  },
  lastAccessColumn: {
    defaultMessage: 'Último acesso',
    id: 'n6hyQa',
    description: 'The title in the last access column',
  },
  suitcaseIconDescription: {
    defaultMessage: 'Um ícone de maleta, representando a produtividade.',
    id: 'acYrvm',
    description: 'The suiticase icon description',
  },
  pauseIconDescription: {
    defaultMessage: 'Um ícone de pausa, representando bloqueios.',
    id: 'CgwzlN',
    description: 'The pause icon description',
  },

  noKrsFlag: {
    defaultMessage: 'Sem KR',
    id: '8PcB2d',
    description: 'This message appears on table that shows the no members no related KRs.',
  },
})
