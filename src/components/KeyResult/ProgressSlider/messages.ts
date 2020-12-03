import { MessageDescriptor, defineMessages } from 'react-intl'

type ProgressSliderMessages = 'updateProgress' | 'closeIconTitle' | 'closeIconDesc'

export default defineMessages({
  updateProgress: {
    defaultMessage: 'Atualizar Progresso',
    id: 'fNt8Of',
    description:
      'This is the title of our progress slider popover. It appears when the user moves the slider thumb',
  },

  closeIconTitle: {
    defaultMessage: 'Fechar',
    id: 'QKUmFp',
    description:
      'This message is displayed when an user hovers the close button of our progress slider popover',
  },

  closeIconDesc: {
    defaultMessage:
      'Um ícone de "x". Ao clicar nele você fechará o box de atualização de progresso',
    id: 'SWl7UB',
    description:
      'This description is used for accessibility. Screen readers uses it when they hover the close icon button in our progress slider popover close button',
  },
}) as Record<ProgressSliderMessages, MessageDescriptor>
