import { defineMessages } from 'react-intl'

type TeamListMessages = 'anchorArrowRightDesc'

export default defineMessages<TeamListMessages>({
  anchorArrowRightDesc: {
    defaultMessage:
      'Um ícone de seta para a direita. Ao clicar aqui voce será enviado para a página deste time',
    id: 'pTXAs1',
    description:
      'This message is used by screen readers to explain the right arrow at our team lists component',
  },
})
