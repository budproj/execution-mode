import { MessageDescriptor, defineMessages } from 'react-intl'

type SelectMenuMessages = 'iconChevronDownDesc'

export default defineMessages({
  iconChevronDownDesc: {
    defaultMessage: 'Uma seta para baixo. Ao clicar nela você abrirá o menu de seleção',
    id: 'rH+dGv',
    description:
      'This is the desc attribute of our chevron down icon. It is used by screen readers',
  },
}) as Record<SelectMenuMessages, MessageDescriptor>
