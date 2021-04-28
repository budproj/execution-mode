import { defineMessages } from 'react-intl'

type KeyResultsSectionGoalMessage = 'iconDescription' | 'heading' | 'hoverIconDescription'

export default defineMessages<KeyResultsSectionGoalMessage>({
  iconDescription: {
    defaultMessage: 'Um ícone de um alvo, indicando que essa é a meta do seu resultado-chave',
    id: 'YzN13f',
    description: 'The description text for the key-result section goal icon',
  },

  heading: {
    defaultMessage: 'Meta',
    id: '/50OpL',
    description: 'The heading text of the goal section in our key-result drawer',
  },

  hoverIconDescription: {
    defaultMessage:
      'Uma seta para baixo. Ela indica que ao clicar aqui você irá editar a meta deste resultado-chave',
    id: 'Dt91Bg',
    description:
      'This message is displayed for screen readers as the description of the arrow down icon inside the key-result drawer. That icon is only displayed when the user hovers the mouse over the goal',
  },
})
