import { defineMessages } from 'react-intl'

type KeyResultSectionTitleMessage =
  | 'lastUpdateTextPrefix'
  | 'openGraphIconDesc'
  | 'optionsButtonDesc'

export default defineMessages<KeyResultSectionTitleMessage>({
  lastUpdateTextPrefix: {
    defaultMessage: 'Último check-in',
    id: '8693wE',
    description:
      'This message is displayed alongisde with the header, as the prefix for our last update text component',
  },

  openGraphIconDesc: {
    defaultMessage: 'Um ícone de seta. Ao clicar você abrirá o gráfico de progress',
    id: 'NAsOFG',
    description:
      'This text is used by screen readers to explain the arrow icon to open the progress chart in our key-result sidebar',
  },

  optionsButtonDesc: {
    defaultMessage: 'Botão de opções',
    id: 'XCDzMo',
    description:
      'This button allows you to choose an option that can allow you to copy the title ou exclude the KR.',
  },
})
