import { defineMessages, MessageDescriptor } from 'react-intl'

export default defineMessages({
  title: {
    defaultMessage: 'Clique aqui para ver suas notificações',
    id: 'zIx/gZ',
    description:
      'The title text of our notification bell, it is displayed when an user hover the icon itself',
  },

  desc: {
    defaultMessage: 'Um ícone de sino, ao clicar nele você verá suas notificações',
    id: 'Sn7K6v',
    description: 'The alternative text explaining our notification bell icon',
  },
}) as Record<string, MessageDescriptor>
