import { defineMessages } from 'react-intl'

type NotFoundMessage =
  | 'title'
  | 'callToAction'
  | 'description'
  | 'imageAlt'
  | 'button'
  | 'metaTitle'

export default defineMessages<NotFoundMessage>({
  title: {
    defaultMessage: 'A página que você está procurando não foi encontrada!',
    id: 'yiDjW/',
    description: 'The title displayed in our not found page',
  },

  callToAction: {
    defaultMessage: 'Clique no botão abaixo para voltar para o Painel :)',
    id: '6B2/Mv',
    description: 'This message is displayed above the button in our not found page',
  },

  description: {
    defaultMessage: 'Esse link pode estar expirado ou a URL está errada.',
    id: 'xqxnpO',
    description: 'The description displayed in our not found page',
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
