import { defineMessages } from 'react-intl'

type KeyResultProgressTitleMessage = 'openGraphIconDesc' | 'heading'

export default defineMessages<KeyResultProgressTitleMessage>({
  openGraphIconDesc: {
    defaultMessage: 'Um ícone de seta. Ao clicar você abrirá o gráfico de progress',
    id: 'NAsOFG',
    description:
      'This text is used by screen readers to explain the arrow icon to open the progress chart in our key-result sidebar',
  },

  heading: {
    defaultMessage: 'Progresso',
    id: 'O4iDCM',
    description: 'The title of the progress section in our key-result sidebar',
  },
})
