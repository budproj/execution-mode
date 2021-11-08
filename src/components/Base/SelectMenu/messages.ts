import { defineMessages } from 'react-intl'

type SelectMenuMessage = 'iconChevronDownDesc' | 'iconChevronUpDesc' | 'defaultPlaceholder'

export default defineMessages<SelectMenuMessage>({
  iconChevronDownDesc: {
    defaultMessage: 'Uma seta para baixo. Ao clicar nela você abrirá o menu de seleção',
    id: 'rH+dGv',
    description:
      'This is the desc attribute of our chevron down icon. It is used by screen readers',
  },

  iconChevronUpDesc: {
    defaultMessage: 'Uma seta para cima. Ao clicar nela você fechará o menu de seleção',
    id: 'ND5T6U',
    description: 'This is the desc attribute of our chevron up icon. It is used by screen readers',
  },

  defaultPlaceholder: {
    defaultMessage: 'Selecionar',
    id: 'A+zcmM',
    description: 'This is the default placeholder while selecting a given value in a select menu',
  },
})
