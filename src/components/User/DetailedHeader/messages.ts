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
    defaultMessage: 'Progresso individual com base na média dos resultados-chave deste ano',
    id: 'gTym4f',
    description: 'Yearly progress chart tooltip message',
  },

  quarterlyProgress: {
    defaultMessage: 'Progresso Trimestral',
    id: 'BOJlqi',
    description: "User's quarterly progress title",
  },

  quarterlyProgressTooltip: {
    defaultMessage: 'Progresso individual com base na média dos resultados-chave deste trimestre',
    id: 'N70n39',
    description: 'Quarterly progress chart tooltip message',
  },
  companyOKRTitle: {
    defaultMessage: 'OKRs {companypreposition} {company}',
    id: '30/oaM',
    description: 'Company OKR title on the navigation tab',
  },
  individualOKRTitle: {
    defaultMessage: 'Plano Individual',
    id: 'Y8TWo2',
    description: 'Individual OKR title on the navigation tab',
  },
})
