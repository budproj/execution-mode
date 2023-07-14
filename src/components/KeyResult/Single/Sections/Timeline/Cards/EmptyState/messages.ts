import { defineMessages } from 'react-intl'

type KeyResultsSectionTimelineCardEmtpyStateMessage =
  | 'iconDesc'
  | 'title'
  | 'description'
  | 'emptyState'

export default defineMessages<KeyResultsSectionTimelineCardEmtpyStateMessage>({
  iconDesc: {
    defaultMessage:
      'Um desenho de fantasma, indicando que este resultado-chave não tem nenhum card de atividade',
    id: 'VltGNp',
    description:
      'This text is used by screen readers to explain our ghost image inside our key result drawers',
  },

  title: {
    defaultMessage: 'Está silencioso por aqui',
    id: 'vDa/w5',
    description: 'This text is the title of our empty state card inside our key result drawers',
  },

  description: {
    defaultMessage:
      'Faz tempo que ninguém interage nesse resultado-chave. Que tal compartilhar uma informação relevante com o time? :)',
    id: '2chQA0',
    description:
      'This text gives more details regarding our empty state card in the key result drawers',
  },

  emptyState: {
    defaultMessage:
      'Tudo tranquilo por aqui! {breakline}Nenhum feedback ou alteração foi realizado nesse resultado-chave.',
    id: 'B2t3EA',
    description: 'The emptyState message.',
  },
})
