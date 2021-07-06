import { defineMessages } from 'react-intl'

type ActionMenuMessage =
  | 'optionsButtonIconDesc'
  | 'explorePreviousCyclesOption'
  | 'createOKRInThisCycleOption'
  | 'createOKRInRelatedCycleOption'

export default defineMessages<ActionMenuMessage>({
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

  createOKRInThisCycleOption: {
    defaultMessage: 'Adicionar um OKR neste ciclo',
    id: 'TaXVmY',
    description: 'This message is displayed inside the team page, on the options menu of a cycle',
  },

  createOKRInRelatedCycleOption: {
    defaultMessage: 'Adicionar um OKR {cadence} no ciclo {cycle} {parent}',
    id: '612Wwz',
    description: 'This message is displayed inside the team page, on the options menu of a cycle',
  },
})
