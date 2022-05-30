import { defineMessages } from 'react-intl'

type CyclesListBodyColumnStatusMessage =
  | 'activeCycleTitleOption'
  | 'notActiveCycleTitleOption'
  | 'activeCycleDescriptionOption'
  | 'notActiveCycleDescriptionOption'

export default defineMessages<CyclesListBodyColumnStatusMessage>({
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
