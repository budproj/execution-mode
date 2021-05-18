import { defineMessages } from 'react-intl'

type UnknownErrorPageMessage =
  | 'title'
  | 'subtitle'
  | 'description'
  | 'imageAlt'
  | 'button'
  | 'metaTitle'

export default defineMessages<UnknownErrorPageMessage>({
  title: {
    defaultMessage: 'Ué! Cadê a tela que tava aqui?',
    id: '5th5LY',
    description: 'The title displayed in our unknown error page',
  },

  subtitle: {
    defaultMessage: 'A tela que você está procurando foi abduzida!',
    id: 's6f/IS',
    description: 'This message is displayed below the title in our unknown error page',
  },

  description: {
    defaultMessage:
      'Mas não se preocupe, ela vai ficar bem! Enquanto trabalhamos nisso, você pode clicar no botão aqui embaixo para voltar para o painel :)',
    id: '29ODQz',
    description: 'The description displayed in our unknown error page',
  },

  imageAlt: {
    defaultMessage:
      'O desenho de um fantasma, ilustrando que você está em uma página que não existe',
    id: '+IK11v',
    description: 'This message is the alt message for our box drawing in the unknown error page',
  },

  button: {
    defaultMessage: 'Voltar',
    id: 'nrToz/',
    description: 'This message is displayed as a label in the button on our unknown error page',
  },

  metaTitle: {
    defaultMessage: 'Erro inesperado | bud ',
    id: 'XiSFEr',
    description: 'The page title of our unknown error page that is displayed in the browser tab',
  },
})
