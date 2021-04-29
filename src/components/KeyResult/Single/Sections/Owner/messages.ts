import { defineMessages } from 'react-intl'

type KeyResultsSectionOwnerMessage = 'label' | 'changeIconDesc'

export default defineMessages<KeyResultsSectionOwnerMessage>({
  label: {
    defaultMessage: 'Responsável',
    id: 'iJq7du',
    description: 'The label text above the Owner section in our key result single page or drawer',
  },

  changeIconDesc: {
    defaultMessage:
      'Um ícone de setas entrelaçadas. Ao clicar aqui você irá trocar o dono deste resultado-chave',
    id: '4Ekhch',
    description:
      'This message is used by screen readers when the user is focusing on the owner section of the key-result drawer',
  },
})
