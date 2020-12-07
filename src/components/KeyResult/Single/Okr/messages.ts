import { MessageDescriptor, defineMessages } from 'react-intl'

type KeyResultsSingleOKRMessages = 'label' | 'stackIconDesc'

export default defineMessages({
  label: {
    defaultMessage: 'OKR',
    id: 'oVCNrO',
    description:
      'The label text above the OKR selection input in our key result single page or drawer',
  },

  stackIconDesc: {
    defaultMessage: 'Um ícone de com diversas superfícies, uma em cima da outra',
    id: 'UBruoq',
    description: 'The alternative text explaining our stack icon',
  },
}) as Record<KeyResultsSingleOKRMessages, MessageDescriptor>
