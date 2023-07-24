import { defineMessages } from 'react-intl'

type TeamSearchMessage = 'congratulationsTitle' | 'congratulationsContent' | 'closeButton'

export default defineMessages<TeamSearchMessage>({
  congratulationsTitle: {
    defaultMessage: 'Parabéns! Você completou este resultado chave.',
    id: 'DRKiQR',
    description: 'The text is displayed as a heading in the add team modal',
  },
  congratulationsContent: {
    defaultMessage:
      'Comemore muito! Seu esforço e de seu time valeram a pena, agora vocês ainda mais perto de alcançar seus objetivos. O bud não irá mais te notificar sobre este resultado-chave',
    id: 'hKx+8w',
    description: 'The text is displayed as a heading in the add team modal',
  },
  closeButton: {
    defaultMessage: 'Fechar',
    id: '0s+qty',
    description: 'The text is displayed as a heading in the add team modal',
  },
})
