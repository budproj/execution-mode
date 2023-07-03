import { defineMessages } from 'react-intl'

type ObjectiveAccordionPanelMessage =
  | 'insertButtonIconDesc'
  | 'insertButtonLabel'
  | 'keyResultListEmptyStateMessage'
  | 'keyResultListDraftEmptyStateMessage'
  | 'createKeyResultButtonLabelMessage'
  | 'publishOkrButtonLabelMessage'

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

  keyResultListDraftEmptyStateMessage: {
    defaultMessage:
      'O objetivo está pronto! Agora chegou a hora de criar um resultado-chave para poder metrificar e acompanhar o progresso desse objetivo.',
    id: 'eQ1tuY',
    description:
      'This message is displayed in the draft key-results empty state inside the team page when an objective has no draft key-results',
  },
  createKeyResultButtonLabelMessage: {
    defaultMessage: 'Criar resultado-chave',
    id: 'u90W4w',
    description:
      'This message is displayed as label of the button used to create a new key-result in a draft okr card.',
  },

  publishOkrButtonLabelMessage: {
    defaultMessage: 'Publicar',
    id: 'B8EqZN',
    description: 'This message is displayed as label of the button used to publish a OKR.',
  },
})
