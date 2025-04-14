import { defineMessages } from 'react-intl'

type KeyResultsSectionOwnerMessage =
  | 'label'
  | 'supportTeam'
  | 'add'
  | 'addSupportTeam'
  | 'addPerson'
  | 'supportTeamDescription'
  | 'supportTeamTooltipDescription'
  | 'tooltipCheckIns'
  | 'tooltipCheckInsDescription'
  | 'tooltipEditionAccess'
  | 'tooltipEditionAccessDescription'
  | 'tooltipNotifications'
  | 'tooltipNotificationsDescription'

export default defineMessages<KeyResultsSectionOwnerMessage>({
  label: {
    defaultMessage: 'Responsável',
    id: 'IHNvqx',
    description: 'The label text above the Owner section in our key result single page or drawers',
  },

  supportTeam: {
    defaultMessage: 'Time de Apoio',
    id: 'iWDn4y',
    description:
      'The label text above Support Team section in our key resulg single page or drawers',
  },

  add: {
    defaultMessage: 'Adicionar',
    id: 'U1tYhb',
    description: 'The label text for the add button in our key result single page or drawers',
  },

  addSupportTeam: {
    defaultMessage: 'Adicionar Time de Apoio',
    id: 'ooNWJL',
    description: 'The label text for the add button icon in our key result single page or drawers',
  },

  addPerson: {
    defaultMessage: 'Adicionar Pessoa',
    id: '2+RDgf',
    description: 'The label text for the add button in our support team popover',
  },

  supportTeamDescription: {
    defaultMessage: 'Essas são as pessoas ajudando {name} neste resultado-chave',
    id: '5uf2Lq',
    description: 'The message to guide and describe on what is a support team',
  },

  supportTeamTooltipDescription: {
    defaultMessage:
      'O time de apoio é uma ou mais pessoas que apoiam o responsável em um resultado-chave. No Bud, isso significa',
    id: 'dlYnI1',
    description: 'The message to guide and describe on what is a support team',
  },

  tooltipCheckIns: {
    defaultMessage: 'CHECK-INS',
    id: 'jRsXuq',
    description: 'The tooltip text for the check-ins text',
  },

  tooltipCheckInsDescription: {
    defaultMessage:
      'O time de apoio também pode fazer check-in nos resultados-chave dos quais participam.',
    id: '6XgcX8',
    description: 'The tooltip text for the check-ins description',
  },

  tooltipEditionAccess: {
    defaultMessage: 'ACESSO DE EDIÇÃO',
    id: 'iZcwRX',
    description: 'The tooltip text for the edition access text',
  },

  tooltipEditionAccessDescription: {
    defaultMessage: 'Também podem editar informações como título, descrição e meta.',
    id: '3maJd0',
    description: 'The tooltip text for the edition access description',
  },

  tooltipNotifications: {
    defaultMessage: 'NOTIFICAÇÕES',
    id: 'K04poX',
    description: 'The tooltip text for the notifications text',
  },

  tooltipNotificationsDescription: {
    defaultMessage:
      'As notificações relacionadas a este resultado-chave, como novos comentários, também serão enviadas ao time de apoio.',
    id: '78OHKs',
    description: 'The tooltip text for the notifications description',
  },
})
