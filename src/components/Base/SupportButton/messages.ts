import { defineMessages } from 'react-intl'

type SupportButtonMessage = 'tooltip' | 'iconDesc'

export default defineMessages<SupportButtonMessage>({
  tooltip: {
    defaultMessage: 'Ajuda',
    id: 'fx39XE',
    description: 'This tooltip is displayed when the user hovers the support button',
  },

  iconDesc: {
    defaultMessage: 'Ícone de bóia. Ao clicar nele você irá para nossa página de suporte',
    id: 'Q2diI+',
    description: 'SupportButton icon desc. This is used by screen readers for accessibility',
  },
})
