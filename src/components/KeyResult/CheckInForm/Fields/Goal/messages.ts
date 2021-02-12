import { defineMessages } from 'react-intl'

type CheckInFormFieldGoalMessage = 'label' | 'flagIconDesc'

export default defineMessages<CheckInFormFieldGoalMessage>({
  label: {
    defaultMessage: 'Meta',
    id: 'SxsVDt',
    description:
      'This is the label of the check-in form that indicates the goal for her/his key result',
  },

  flagIconDesc: {
    defaultMessage:
      'Um ícone de bandeira, inidcando a meta do resultado-chave no qual você está fazendo check-in',
    id: 'zev4wl',
    description: 'This is a message explaining the flag icon in our check-in form',
  },
})
