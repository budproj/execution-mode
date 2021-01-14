import { defineMessages } from 'react-intl'

type SupportButtonMessage = 'iconTitle' | 'iconDesc'

export default defineMessages<SupportButtonMessage>({
  iconTitle: {
    defaultMessage: 'Clique aqui para acessar nossa página de suporte',
    id: 'hRddDx',
    description:
      'SupportButton icon title that links to support page. It is displayed when the user hovers the icon itself',
  },

  iconDesc: {
    defaultMessage:
      'Ícone de um ponto de interrogação. Ao clicar nele você irá para nossa página de suporte',
    id: 'xRyM8t',
    description: 'SupportButton icon desc. This is used by screen readers for accessibility',
  },
})
