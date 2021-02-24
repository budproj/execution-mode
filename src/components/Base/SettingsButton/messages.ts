import { defineMessages } from 'react-intl'

type SupportButtonMessage = 'iconTitle' | 'iconDesc'

export default defineMessages<SupportButtonMessage>({
  iconTitle: {
    defaultMessage: 'Clique aqui para acessar nossa página de configurações',
    id: '6lmXk8',
    description:
      'SupportButton icon title that links to settings page. It is displayed when the user hovers the icon itself',
  },

  iconDesc: {
    defaultMessage:
      'Ícone de uma engrenagem. Ao clicar nele você irá para nossa página de configurações',
    id: 'N+Tad7',
    description: 'GearButton icon desc. This is used by screen readers for accessibility',
  },
})
