import { defineMessages } from 'react-intl'

type MyKeyResultsActiveCyclesPageMessage =
  | 'pageTitle'
  | 'metaTitle'
  | 'metaDescription'
  | 'firstTab'
  | 'secondTab'

export default defineMessages<MyKeyResultsActiveCyclesPageMessage>({
  pageTitle: {
    defaultMessage: 'Meus Resultados-Chave',
    id: 'kynYpx',
    description: 'The page title that our users should see in the my key results page',
  },

  metaTitle: {
    defaultMessage: 'Meus Resultados-Chave | bud ',
    id: '5XBq+p',
    description: 'The page title that is displayed in the browser tab',
  },

  metaDescription: {
    defaultMessage:
      'Visualize seus resultados-chave e seus detalhes, atualize seu progresso e seu nível de confiança.',
    id: 'AII0ao',
    description: 'The page description that is displayed in Google and screen readers',
  },

  firstTab: {
    defaultMessage: 'Ciclos ativos',
    id: 'mdG+CG',
    description:
      'This text is displayed as a tab where the user can click to change the view below it',
  },

  secondTab: {
    defaultMessage: 'Explorar ciclos anteriores',
    id: 'JBA9+L',
    description:
      'This text is displayed as a tab where the user can click to change the view below it',
  },
})
