import { defineMessages } from 'react-intl'

type CreateFormMessage =
  | 'objectivesTitle'
  | 'keyResultsTitle'
  | 'high'
  | 'medium'
  | 'low'
  | 'barrier'
  | 'highConfidenceTooltip'
  | 'confidenceWithoutKeyResultsTooltip'

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
  highConfidenceTooltip: {
    defaultMessage:
      'Tudo certo por aqui! Navegue pelos times para explorar os resultados-chave com alta confiança.',
    id: 'y18Ymm',
    description: 'Tooltip content for high confidence health strategy box',
  },
  confidenceWithoutKeyResultsTooltip: {
    defaultMessage: 'Não existem resultados-chave com esse Nível de confiança.',
    id: 'lWcm/y',
    description: 'Tooltip content for health strategy box without key results',
  },
})
