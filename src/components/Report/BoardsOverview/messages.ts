import { defineMessages } from 'react-intl'

type CreateFormMessage =
  | 'objectivesTitle'
  | 'keyResultsTitle'
  | 'high'
  | 'medium'
  | 'low'
  | 'barrier'

export default defineMessages<CreateFormMessage>({
  objectivesTitle: {
    defaultMessage: 'Objetivos',
    id: 'R/9LlP',
    description: 'Title of objectives',
  },
  keyResultsTitle: {
    defaultMessage: 'Resultados-Chave',
    id: 'GyV44g',
    description: 'Title of key results',
  },
  high: {
    defaultMessage: 'Alta confiança',
    id: 'ub6rlW',
    description: 'Title of high confidence health strategy',
  },
  medium: {
    defaultMessage: 'Média confiança',
    id: 'Wa22G2',
    description: 'Title of medium confidence health strategy',
  },
  low: {
    defaultMessage: 'Baixa confiança',
    id: 'gXiIKg',
    description: 'Title of low confidence health strategy',
  },
  barrier: {
    defaultMessage: 'Com barreira',
    id: '7xrfSX',
    description: 'Title of barrier health strategy',
  },
})
