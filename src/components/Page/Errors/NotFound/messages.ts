import { defineMessages } from 'react-intl'

type NotFoundErrorPageMessage =
  | 'title'
  | 'callToAction'
  | 'description'
  | 'imageAlt'
  | 'button'
  | 'metaTitle'

export default defineMessages<NotFoundErrorPageMessage>({
  title: {
    defaultMessage: 'A página que você está procurando não foi encontrada!',
    id: 'SenoB2',
    description: 'The title displayed in our not found error page',
  },

  callToAction: {
    defaultMessage: 'Clique no botão abaixo para voltar para o Painel :)',
    id: 'lMYmAU',
    description: 'This message is displayed above the button in our not found error page',
  },

  description: {
    defaultMessage: 'Esse link pode estar expirado ou a URL está errada.',
    id: 'vJ/603',
    description: 'The description displayed in our not found error page',
  },

  imageAlt: {
    defaultMessage:
      'O desenho de um fantasma, ilustrando que você está em uma página que não existe',
    id: 'Jdklxm',
    description: 'This message is the alt message for our box drawing in the not found error page',
  },

  button: {
    defaultMessage: 'Voltar',
    id: 'or8fId',
    description: 'This message is displayed as a label in the button on our not found error page',
  },

  metaTitle: {
    defaultMessage: 'Página não encontrada | bud ',
    id: 'Gt9Z3F',
    description: 'The page title of our not found error page that is displayed in the browser tab',
  },
})
