import { defineMessages } from 'react-intl'

type NamedAvatarMessage = 'changeIconDesc' | 'crownIconDesc' | 'leaderTitle'

export default defineMessages<NamedAvatarMessage>({
  changeIconDesc: {
    defaultMessage: 'Um ícone de setas entrelaçadas. Ao clicar aqui você irá editar esse campo',
    id: 'OEfoTC',
    description:
      'This message is used by screen readers when the user is focusing on the component which contains the user name and picture. This component is used in multiple places, like: our header, the key-result drawers, and other',
  },
  crownIconDesc: {
    defaultMessage: 'Um ícone de coroa que indica o líder do time',
    id: 'OrqJud',
    description: 'The crown icon description',
  },
  leaderTitle: {
    defaultMessage: 'Líder',
    id: 'l+HPdy',
    description: 'The tag title that is displayed when that user is the leader of the team',
  },
})
