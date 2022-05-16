import { defineMessages } from 'react-intl'

type ActionMenuMessage =
  | 'history'
  | 'backToPresent'
  | 'createItem'
  | 'optionsButtonIconDesc'
  | 'explorePreviousCyclesOption'
  | 'createOKRInRelatedCycleOption'
  | 'draftObjectiveTitle'
  | 'draftObjectiveErrorToastMessage'

export default defineMessages<ActionMenuMessage>({
  history: {
    defaultMessage: 'Histórico',
    id: 'na6BgW',
    description: 'History, historic, archived items',
  },

  backToPresent: {
    defaultMessage: 'Voltar ao presente',
    id: 'jXZZd6',
    description: 'go back to the present button description',
  },

  createItem: {
    defaultMessage: 'Criar Objetivo ',
    id: 'gAgkzF',
    description: 'create new key result',
  },

  optionsButtonIconDesc: {
    defaultMessage: 'Um ícone de tres pontos, indicando que ao clicar aqui um menu se expandirá',
    id: 'OErdYA',
    description:
      'The description for screen readers regarding the three dots above the objectives accordion',
  },

  explorePreviousCyclesOption: {
    defaultMessage: 'Explorar ciclos anteriores',
    id: 'c8x6gV',
    description:
      'This message is displayed when the user opens the menu inside a given cycle at the team page',
  },

  createOKRInRelatedCycleOption: {
    defaultMessage: 'Adicionar um OKR {cadence} no ciclo {cycle} {parent}',
    id: '612Wwz',
    description: 'This message is displayed inside the team page, on the options menu of a cycle',
  },

  draftObjectiveTitle: {
    defaultMessage: 'Novo objetivo',
    id: '6Syzud',
    description:
      'This message is used as the draft title of a new objective when an objective is created inside the team page',
  },

  draftObjectiveErrorToastMessage: {
    defaultMessage: 'Houve um erro inesperado ao criar seu objetivo. Tente novamente mais tarde',
    id: 'i9bdpU',
    description:
      'This message appears as an error toast when the users tries to create a new objective but an error appears',
  },
})
