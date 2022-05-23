import { defineMessages } from 'react-intl'

type MyKeyResultsActiveCyclesPageMessage =
  | 'yearlyProgress'
  | 'yearlyProgressTooltip'
  | 'quarterlyProgress'
  | 'quarterlyProgressTooltip'
  | 'companyOKRTitle'
  | 'individualOKRTitle'

export default defineMessages<MyKeyResultsActiveCyclesPageMessage>({
  yearlyProgress: {
    defaultMessage: 'Progresso Anual',
    id: '4MCOg+',
    description: "User's yearly progress title",
  },

  yearlyProgressTooltip: {
    defaultMessage: 'Média do progresso de todos os seus resultados-chave no ciclo anual atual',
    id: '7fTFkO',
    description: 'Yearly progress chart tooltip message',
  },

  quarterlyProgress: {
    defaultMessage: 'Progresso Trimestral',
    id: 'BOJlqi',
    description: "User's quarterly progress title",
  },

  quarterlyProgressTooltip: {
    defaultMessage:
      'Média do progresso de todos os seus resultados-chave no ciclo trimestral atual',
    id: 'P0ljMC',
    description: 'Quarterly progress chart tooltip message',
  },
  companyOKRTitle: {
    defaultMessage: 'OKRs da {company}',
    id: 'CmpXX/',
    description: 'Company OKR title on the navigation tab',
  },
  individualOKRTitle: {
    defaultMessage: 'Planejamento individual',
    id: 'tBBHmo',
    description: 'Individual OKR title on the navigation tab',
  },
})
