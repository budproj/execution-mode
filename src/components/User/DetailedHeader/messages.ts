import { defineMessages } from 'react-intl'

type MyKeyResultsActiveCyclesPageMessage =
  | 'yearlyProgress'
  | 'yearlyProgressTooltip'
  | 'quarterlyProgress'
  | 'quarterlyProgressTooltip'

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
})
