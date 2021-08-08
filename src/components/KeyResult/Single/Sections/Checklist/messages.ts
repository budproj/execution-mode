import { defineMessages } from 'react-intl'

type KeyResultsSectionChecklistMessage = 'heading' | 'collapseButtonDesc'

export default defineMessages<KeyResultsSectionChecklistMessage>({
  heading: {
    defaultMessage: 'Check-list',
    id: 'PktsGq',
    description: 'This is the title of our checklist section inside the key-result sidebar',
  },

  collapseButtonDesc: {
    defaultMessage: 'Uma seta que ao ser clicada expande a checklist deste resultado-chave',
    id: 'SsQRcF',
    description:
      'This message is used by screen readers to explain the collapse icon in our key-result sidebar on the checklist section',
  },
})
