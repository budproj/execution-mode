import { defineMessages } from 'react-intl'

type teamIndicatorsTableMessages = 'checkinColumnIconDesc' | 'checklistColumnIconDesc'

export default defineMessages<teamIndicatorsTableMessages>({
  checkinColumnIconDesc: {
    defaultMessage:
      'Um ícone de localização que aparece junto a coluna de check-in de um usuário na tabela de indicatores de um time',
    id: '1IedeB',
    description:
      'A checklist icon that appears next to a user checkin column in a team indicators table',
  },
  checklistColumnIconDesc: {
    defaultMessage:
      'Um ícone de checagem que aparece junto a coluna de check-list de um usuário na tabela de indicatores de um time',
    id: 'hUA7Fo',
    description:
      'A checklist icon that appears next to a user checklist column in a team indicators table',
  },
})
