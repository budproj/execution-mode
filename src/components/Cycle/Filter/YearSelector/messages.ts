import { defineMessages } from 'react-intl'

type CycleFilterMessage =
  | 'yearSelectorEmptyState'
  | 'yearLeftIconDesc'
  | 'yearRightIconDescClosed'
  | 'yearRightIconDescOpened'
  | 'emptyListLabel'

export default defineMessages<CycleFilterMessage>({
  yearSelectorEmptyState: {
    defaultMessage: 'Selecione o ano',
    id: '7Yw26b',
    description: 'This message is displayed when no year filter was selected',
  },

  yearLeftIconDesc: {
    defaultMessage:
      'Um ícone de calendário, indicando que aqui você seleciona o ano que deseja filtrar',
    id: 'SiJuyU',
    description: 'This message is used by screen readers to explain the icon to the user',
  },

  yearRightIconDescClosed: {
    defaultMessage: 'Uma seta para baixo, indicando que ao clicar você irá abrir a lista de ciclos',
    id: 'e37pvj',
    description:
      'This message is displayed to the user screen reader when the year select menu is closed',
  },

  yearRightIconDescOpened: {
    defaultMessage: 'Uma seta para cima, indicando que o menu de seleção de ciclos está aberto',
    id: '7d+540',
    description:
      'This message is displayed to the user screen reader when the year select menu is opened',
  },

  emptyListLabel: {
    defaultMessage: 'Nenhuma opção disponível',
    id: 'eYhGZW',
    description:
      'This message is displayed when the user tries to list the cycles, but none is defined',
  },
})
