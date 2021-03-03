import { defineMessages } from 'react-intl'

type ProgressSliderMessage = 'popoverTitle' | 'closeIconTitle' | 'closeIconDesc' | 'thumbTooltip'

export default defineMessages<ProgressSliderMessage>({
  popoverTitle: {
    defaultMessage: 'Check-in',
    id: '3gAggt',
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

  thumbTooltip: {
    defaultMessage: 'Arraste até o novo valor para iniciar um check-in',
    id: 'XEey8C',
    description: 'This tooltip is displayed when the user hovers the thumb of our progress bar',
  },
})
