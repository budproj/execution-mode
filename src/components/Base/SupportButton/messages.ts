import { defineMessages } from 'react-intl'

type SupportButtonMessage = 'iconTitle' | 'iconDesc'

export default defineMessages<SupportButtonMessage>({
  iconTitle: {
    defaultMessage: 'Ajuda',
    id: 'hdclOn',
    description:
      'SupportButton icon title that links to support page. It is displayed when the user hovers the icon itself',
  },

  iconDesc: {
    defaultMessage: 'Ícone de bóia. Ao clicar nele você irá para nossa página de suporte',
    id: 'Q2diI+',
    description: 'SupportButton icon desc. This is used by screen readers for accessibility',
  },
})
