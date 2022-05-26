import { defineMessages } from 'react-intl'

type CyclesListBodyColumnStatusMessage =
  | 'lastUpdateTextPrefix'
  | 'outdatedUpdateTextPrefix'
  | 'outdatedUpdateIconDescription'
  | 'upToDateUpdateIconDescription'
  | 'activeCycleTitleOption'
  | 'notActiveCycleTitleOption'
  | 'activeCycleDescriptionOption'
  | 'notActiveCycleDescriptionOption'

export default defineMessages<CyclesListBodyColumnStatusMessage>({
  lastUpdateTextPrefix: {
    defaultMessage: 'Check-in realizado',
    id: 'ItLQef',
    description:
      'This message is displayed alongisde with the key-result name, as the prefix for our last update text component',
  },

  outdatedUpdateTextPrefix: {
    defaultMessage: 'Sem check-in',
    id: 'M2QJC/',
    description:
      'This message is displayed alongisde with the key-result name, as the prefix for our last update text component',
  },

  outdatedUpdateIconDescription: {
    defaultMessage: 'Check-in pendente',
    id: 'vgU7fC',
    description:
      'This string is used as the description for the icon that indicates that the key-result has not been updated',
  },

  upToDateUpdateIconDescription: {
    defaultMessage: 'Check-in realizado',
    id: 'I8NCD3',
    description:
      'This string is used as the description for the icon that indicates that the key-result is updated',
  },

  activeCycleTitleOption: {
    defaultMessage: 'Ativo',
    id: 'CQPpEV',
    description: 'This string is used to select the active cycles option.',
  },

  notActiveCycleTitleOption: {
    defaultMessage: 'Inativo',
    id: 'ywBP21',
    description: 'This string is used to select the not-active cycles option.',
  },
  activeCycleDescriptionOption: {
    defaultMessage:
      'O ciclo está ativo, a funcionalidade de check-in está disponível, e o progresso está sendo mensurado.',
    id: '7GDhfH',
    description: 'This string is used to describe the cycles active status option.',
  },
  notActiveCycleDescriptionOption: {
    defaultMessage:
      'O ciclo está fechado. Não é possível editar nem atualizar os OKRs, mas eles podem ser consultados pelo histórico.',
    id: 'vO+kQj',
    description: 'This string is used to describe the cycles not-active status option.',
  },
})
