import { defineMessages } from 'react-intl'

type ObjectivesFromCycleMessage =
  | 'title'
  | 'optionsButtonIconDesc'
  | 'explorePreviousCyclesOption'
  | 'createOKROption'
  | 'draftObjectiveTitle'

export default defineMessages<ObjectivesFromCycleMessage>({
  title: {
    defaultMessage: '{prefix} {cycle} {suffix}',
    id: 'T5iKmP',
    description: 'This message displays the cycle name with a given prefix',
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

  createOKROption: {
    defaultMessage: 'Adicionar um OKR neste ciclo',
    id: 'TaXVmY',
    description: 'This message is displayed inside the team page, on the options menu of a cycle',
  },

  draftObjectiveTitle: {
    defaultMessage: 'Novo objetivo',
    id: '6Syzud',
    description:
      'This message is used as the draft title of a new objective when an objective is created inside the team page',
  },
})
