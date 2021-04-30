import { defineMessages } from 'react-intl'

type NamedAvatarMessage = 'changeIconDesc'

export default defineMessages<NamedAvatarMessage>({
  changeIconDesc: {
    defaultMessage: 'Um ícone de setas entrelaçadas. Ao clicar aqui você irá editar esse campo',
    id: '62Zn7m',
    description:
      'This message is used by screen readers when the user is focusing on the component which contains the user name and picture. This component is used in multiple places, like: our header, the key-result drawer, and other',
  },
})
