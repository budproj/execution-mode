import { defineMessages } from 'react-intl'

type NotFoundMessage = 'title' | 'subtitle' | 'description' | 'imageAlt' | 'button' | 'metaTitle'

export default defineMessages<NotFoundMessage>({
  title: {
    defaultMessage: 'Ué! Cadê a tela que tava aqui?',
    id: 'SCe1xz',
    description: 'The title displayed in our not found page',
  },

  subtitle: {
    defaultMessage: 'A tela que você está procurando foi abduzida!',
    id: 'RMsn+8',
    description: 'The subtitle displayed in our not found page',
  },

  description: {
    defaultMessage:
      'Mas não se preocupe, ela vai ficar bem! Enquanto trabalhamos nisso, você pode clicar no botão aqui embaixo para voltar para o painel :)',
    id: 'pYiVtw',
    description: 'This message is displayed as a description in our not found page',
  },

  imageAlt: {
    defaultMessage:
      'O desenho de um fantasma, ilustrando que você está em uma página que não existe',
    id: '4RJXbj',
    description: 'This message is the alt message for our box drawing in the not found page',
  },

  button: {
    defaultMessage: 'Voltar',
    id: '0syFce',
    description: 'This message is displayed as a label in the button on our not found page',
  },

  metaTitle: {
    defaultMessage: 'Página não encontrada | bud ',
    id: 'qBJI5X',
    description: 'The page title of our not found page that is displayed in the browser tab',
  },
})
