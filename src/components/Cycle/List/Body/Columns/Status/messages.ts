import { defineMessages } from 'react-intl'

type CyclesListBodyColumnStatusMessage =
  | 'activeCycleTitleOption'
  | 'notActiveCycleTitleOption'
  | 'activeCycleDescriptionOption'
  | 'notActiveCycleDescriptionOption'
  | 'successEditToastMessage'
  | 'unknownErrorToastMessage'

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

  successEditToastMessage: {
    defaultMessage: 'Ciclo {period} editado com sucesso!',
    id: 't7xKJo',
    description: 'This message appears when we create a new cycle as a toast',
  },

  unknownErrorToastMessage: {
    defaultMessage: 'Desculpe, aconteceu um erro inesperado. Tente novamente mais tarde',
    id: 'cGFQsk',
    description:
      'This message appears as an error toast when we have an unknown error while creating a new cycle',
  },
})
