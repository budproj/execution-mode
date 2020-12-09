import { MessageDescriptor, defineMessages } from 'react-intl'

type KeyResultsSingleOKRMessages = 'label' | 'stackIconDesc'

export default defineMessages({
  label: {
    defaultMessage: 'OKR',
    id: '9bJV7v',
    description: 'The label text above the OKR section in our key result single page or drawer',
  },

  stackIconDesc: {
    defaultMessage: 'Um ícone de com diversas superfícies, uma em cima da outra',
    id: 'UBruoq',
    description: 'The alternative text explaining our stack icon',
  },
}) as Record<KeyResultsSingleOKRMessages, MessageDescriptor>
