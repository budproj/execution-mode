import { defineMessages } from 'react-intl'

type UsersTeamListMessages =
  | 'feelingTitle'
  | 'lowProductivityTitle'
  | 'roadblockTitle'
  | 'userColumn'
  | 'teamColumn'
  | 'modalTitleColumn'
  | 'lastRoutineColumn'
  | 'suitcaseIconDescription'
  | 'pauseIconDescription'

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
  userColumn: {
    defaultMessage: 'Usuário',
    id: 'xm9P9h',
    description: 'The title in the roadblock modal',
  },
  teamColumn: {
    defaultMessage: 'Time',
    id: 'KczxKH',
    description: 'The title in the roadblock modal',
  },
  modalTitleColumn: {
    defaultMessage:
      '{type, select, feeling {Sentimento} productivity {Produtividade} roadblock {Bloqueios} other {}} na semana',
    id: 'Pxthbe',
    description: 'The title in the roadblock modal',
  },
  lastRoutineColumn: {
    defaultMessage: 'Última retrospectiva',
    id: 'YQqWNM',
    description: 'The title in the roadblock modal',
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
})
