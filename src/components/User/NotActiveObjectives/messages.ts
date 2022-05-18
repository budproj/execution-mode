import { defineMessages } from 'react-intl'

type TeamNotActiveObjectivesMessages =
  | 'timeMachineTitle'
  | 'timeMachineDescription'
  | 'timeMachineCloseIconDesc'

export default defineMessages<TeamNotActiveObjectivesMessages>({
  timeMachineTitle: {
    defaultMessage: 'Máquina do tempo',
    id: 'Sm4xi7',
    description:
      "This message is displayed as the title of the time machine section in a team's page",
  },

  timeMachineDescription: {
    defaultMessage: 'Explorar ciclos anteriores',
    id: '5o6tYt',
    description:
      "This message appears below the time machine title, as an auxiliary title in a team's page",
  },

  timeMachineCloseIconDesc: {
    defaultMessage: 'Um ícone de X. Ao clicar nele você irá fechar a máquina do tempo',
    id: '81Bqza',
    description:
      "This message is used by screen readers to explain our time machine close button inside a team's page",
  },
})
