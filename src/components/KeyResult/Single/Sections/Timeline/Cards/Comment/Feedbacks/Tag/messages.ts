import { defineMessages } from 'react-intl'

type KeyResultsFeedbacksTagsMessages =
  | 'suggestion'
  | 'praisal'
  | 'question'
  | 'alignment'
  | 'improvement'
  | 'issue'
  | 'comment'

export default defineMessages<KeyResultsFeedbacksTagsMessages>({
  suggestion: {
    defaultMessage: 'Sugestão',
    id: 'IcfW7m',
    description: 'This text refers to feedbacks with suggestions.',
  },
  praisal: {
    defaultMessage: 'Parabéns',
    id: '8Tdgj3',
    description: 'This text refers to feedbacks with praisal.',
  },
  question: {
    defaultMessage: 'Dúvida',
    id: 'Yn5Xbd',
    description: 'This text refers to feedbacks with a question.',
  },
  alignment: {
    defaultMessage: 'Alinhamento',
    id: 'LXalbg',
    description: 'This text refers to feedbacks with alignment.',
  },
  improvement: {
    defaultMessage: 'Melhoria',
    id: 'JXXHeP',
    description: 'This text refers to feedbacks with improvement suggestion.',
  },
  issue: {
    defaultMessage: 'Problema',
    id: '8wF7XZ',
    description: 'This text refers to feedbacks that report a issue.',
  },
  comment: {
    defaultMessage: 'Comentário',
    id: '3eSDet',
    description: 'This text refers to feedbacks with comment.',
  },
})
