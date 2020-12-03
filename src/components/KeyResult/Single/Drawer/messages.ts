import { MessageDescriptor, defineMessages } from 'react-intl'

type DrawerMessages = 'updateProgress' | 'closeIconTitle' | 'closeIconDesc'

export default defineMessages({
  closeIconTitle: {
    defaultMessage: 'Fechar',
    id: 'j/xH+H',
    description:
      'This message is displayed when an user hovers the close button of our key result drawer',
  },

  closeIconDesc: {
    defaultMessage:
      'Um ícone de "x". Ao clicar nele você fechará o box a barra lateral do resultado chave',
    id: 'n7ZLVl',
    description:
      'This description is used for accessibility. Screen readers uses it when they hover the close icon button in our key result drawer close button',
  },
}) as Record<DrawerMessages, MessageDescriptor>
