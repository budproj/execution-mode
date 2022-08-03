import { defineMessages } from 'react-intl'

type TeamSearchMessage =
  | 'addSubteamHeader'
  | 'editTeamHeader'
  | 'teamNameLabel'
  | 'descriptionLabel'
  | 'leaderLabel'
  | 'parentTeam'
  | 'cancel'
  | 'save'
  | 'addSubteamHeaderDescription'
  | 'descriptionPlaceholder'
  | 'emptyTeamName'

export default defineMessages<TeamSearchMessage>({
  emptyTeamName: {
    defaultMessage: 'Sem time',
    id: 'sEIpfE',
    description: 'The text is displayed of the empty team option',
  },
  addSubteamHeader: {
    defaultMessage: 'Criar time',
    id: 'hohkHN',
    description: 'The text is displayed as a heading in the add team modal',
  },

  editTeamHeader: {
    defaultMessage: 'Editar time',
    id: 'S9cIsW',
    description: 'The text is displayed as a heading in the add team modal',
  },

  addSubteamHeaderDescription: {
    defaultMessage: 'Este time estará vinculado a {teamname}',
    id: 'GeIXxi',
    description: 'The text is displayed as header description in the add team modal',
  },

  teamNameLabel: {
    defaultMessage: 'Nome do time:',
    id: 'Jx/tRY',
    description: 'The label to the team name field in team add/edit modal',
  },

  descriptionLabel: {
    defaultMessage: 'Descrição:',
    id: 'wtGWF6',
    description: 'The label to the description field in team add/edit modal',
  },

  descriptionPlaceholder: {
    defaultMessage: 'Em uma frase, qual é a missão deste time?',
    id: 'qrgfik',
    description: 'The placeholder to the description field in team add/edit modal',
  },

  leaderLabel: {
    defaultMessage: 'Líder:',
    id: 'w/3frD',
    description: 'The label to the leader field in team add/edit modal',
  },

  parentTeam: {
    defaultMessage: 'Este time está dentro de:',
    id: 'vCWYpE',
    description: 'The label to the parent team field in team add/edit modal',
  },

  cancel: {
    defaultMessage: 'Cancelar',
    id: 'yfhIM+',
    description: 'Text in the cancel action button',
  },

  save: {
    defaultMessage: 'Salvar',
    id: 'DB7Ai9',
    description: 'Text in the save action button',
  },
})
