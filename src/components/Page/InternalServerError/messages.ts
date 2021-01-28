import { defineMessages } from 'react-intl'

type InternalServerErrorMessage =
  | 'title'
  | 'subtitle'
  | 'description'
  | 'imageAlt'
  | 'button'
  | 'metaTitle'

export default defineMessages<InternalServerErrorMessage>({
  title: {
    defaultMessage: 'Ué! Cadê a tela que tava aqui?',
    id: 'l3Oaah',
    description: 'The title displayed in our internal server error page',
  },

  subtitle: {
    defaultMessage: 'A tela que você está procurando foi abduzida!',
    id: '8m+ead',
    description: 'This message is displayed below the title in our internal server error page',
  },

  description: {
    defaultMessage:
      'Mas não se preocupe, ela vai ficar bem! Enquanto trabalhamos nisso, você pode clicar no botão aqui embaixo para voltar para o painel :)',
    id: 'cOUqfL',
    description: 'The description displayed in our internal server error page',
  },

  imageAlt: {
    defaultMessage:
      'O desenho de um fantasma, ilustrando que você está em uma página que não existe',
    id: 'ILOigt',
    description:
      'This message is the alt message for our box drawing in the internal server error page',
  },

  button: {
    defaultMessage: 'Voltar',
    id: 'f3B+5Q',
    description:
      'This message is displayed as a label in the button on our internal server error page',
  },

  metaTitle: {
    defaultMessage: 'Erro inesperado | bud ',
    id: 'B7lxk0',
    description:
      'The page title of our internal server error page that is displayed in the browser tab',
  },
})
