import { defineMessages } from 'react-intl'

type MyKeyResultsActiveCyclesPageMessage =
  | 'individualOKRTitle'
  | 'individualOKRSubTitle'
  | 'historyIconDescription'
  | 'historyButtonTitle'
  | 'backToThePresentButtonTitle'
  | 'individualOkrsCompanyMembersTitle'
  | 'createObjectiveButtonTitle'

export default defineMessages<MyKeyResultsActiveCyclesPageMessage>({
  individualOKRTitle: {
    defaultMessage: 'Plano Individual',
    id: 'GuD4W6',
    description: 'Individual OKR title of the page',
  },
  individualOKRSubTitle: {
    defaultMessage:
      'Os OKRs do Plano Individual são definido por você. Eles não interferem no progresso da empresa.',
    id: 'vppqyA',
    description: 'Individual OKR subtitle of the page',
  },

  historyIconDescription: {
    defaultMessage: 'Ícone de histórico',
    id: 'ShzOP9',
    description: 'Icon description for history icon',
  },
  historyButtonTitle: {
    defaultMessage: 'Histórico',
    id: 'K4Rjji',
    description: 'Title of the history button',
  },
  createObjectiveButtonTitle: {
    defaultMessage: 'Criar objetivo',
    id: 'Jk/gDc',
    description: 'Title of the create objective button',
  },
  individualOkrsCompanyMembersTitle: {
    defaultMessage: 'Colegas com plano individual',
    id: 'oGyXN5',
    description: 'Friends with individual OKRs title',
  },
  backToThePresentButtonTitle: {
    defaultMessage: 'Voltar ao presente',
    id: 't0t6MQ',
    description: 'The button title to go back to the present',
  },
})
