import { defineMessages } from 'react-intl'

type KeyResultsSectionAddCommentMessage = 'paperPlaneIconTitle' | 'paperPlaneIconDesc'

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
})
