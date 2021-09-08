import { defineMessages } from 'react-intl'

type KeyResultsSectionAddCommentMessage =
  | 'paperPlaneIconTitle'
  | 'paperPlaneIconDesc'
  | 'placeholder'

export default defineMessages<KeyResultsSectionAddCommentMessage>({
  paperPlaneIconTitle: {
    defaultMessage: 'Enviar comentário',
    id: 'CMMxiV',
    description:
      'The title displayed in the tooltip when the user hovers our paper plane icon in our add comment form',
  },

  paperPlaneIconDesc: {
    defaultMessage: 'Um ícone de um avião de papel. Ao clicar nele você irá enviar um comentário',
    id: '/aK0UI',
    description: 'The alternative text explaining our paper plane icon',
  },

  placeholder: {
    defaultMessage: 'Comente aqui! Para marcar alguém, use @ :)',
    id: 'MgJJAJ',
    description:
      'This text is displayed in our comment input in our key result drawers when it has no value',
  },
})
