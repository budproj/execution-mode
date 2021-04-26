import { defineMessages } from 'react-intl'

type KeyResultsSectionTimelineCardEmtpyStateMessage = 'iconDesc' | 'title' | 'description'

export default defineMessages<KeyResultsSectionTimelineCardEmtpyStateMessage>({
  iconDesc: {
    defaultMessage:
      'Um desenho de fantasma, indicando que este resultado-chave não tem nenhum card de atividade',
    id: 'O0072X',
    description:
      'This text is used by screen readers to explain our ghost image inside our key result drawer',
  },

  title: {
    defaultMessage: 'Está silencioso por aqui',
    id: 'tJ0oU2',
    description: 'This text is the title of our empty state card inside our key result drawer',
  },

  description: {
    defaultMessage:
      'Faz tempo que ninguém interage nesse resultado-chave. Que tal compartilhar uma informação relevante com o time? :)',
    id: 'XL/hXA',
    description:
      'This text gives more details regarding our empty state card in the key result drawer',
  },
})
