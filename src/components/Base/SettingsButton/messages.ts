import { defineMessages } from 'react-intl'

type SupportButtonMessage = 'tooltip' | 'iconDesc'

export default defineMessages<SupportButtonMessage>({
  tooltip: {
    defaultMessage: 'Configurações',
    id: 'W9swHV',
    description: 'This tooltip is displayed when the user hovers the settings icon',
  },

  iconDesc: {
    defaultMessage:
      'Ícone de uma engrenagem. Ao clicar nele você irá para nossa página de configurações',
    id: 'N+Tad7',
    description: 'GearButton icon desc. This is used by screen readers for accessibility',
  },
})
