import { defineMessages } from 'react-intl'

type TeamSearchMessage =
  | 'addSubteamHeader'
  | 'teamNameLabel'
  | 'descriptionLabel'
  | 'leaderLabel'
  | 'parentTeam'
  | 'cancel'
  | 'save'

export default defineMessages<TeamSearchMessage>({
  addSubteamHeader: {
    defaultMessage: 'Adicionar subtime',
    id: 'j/Fraf',
    description: 'The text is displayed as a heading in the add subteam modal',
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
