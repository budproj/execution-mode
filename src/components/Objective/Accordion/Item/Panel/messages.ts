import { defineMessages } from 'react-intl'

type ObjectiveAccordionPanelMessage =
  | 'insertButtonIconDesc'
  | 'insertButtonLabel'
  | 'keyResultListEmptyStateMessage'

export default defineMessages<ObjectiveAccordionPanelMessage>({
  insertButtonIconDesc: {
    defaultMessage:
      'Um ícone com o sinal de positivo, indicando que ao clicar aqui você irá abrir o painel para inserir um resultado-chave',
    id: 'DEMBaq',
    description:
      'This message is used inside the objective accordion panel, on the insert key-result button',
  },

  insertButtonLabel: {
    defaultMessage: 'Criar Resultado-chave',
    id: '6uAE86',
    description:
      'This message is used as the label to the create key-result button inside the objective accordion',
  },

  keyResultListEmptyStateMessage: {
    defaultMessage:
      'Clique no botão <span>...</span> para criar o primeiro resultado-chave deste objetivo.',
    id: 'SU+pQ8',
    description:
      'This message is displayed in the key-results empty state inside the team page when an objective has no key-results',
  },
})
