import { defineMessages } from 'react-intl'

type KeyResultInsertDrawerMessage = 'title' | 'successToastMessage' | 'unexpectedErrorToastMessage'

export default defineMessages<KeyResultInsertDrawerMessage>({
  title: {
    defaultMessage: 'Criar Resultado Chave',
    id: 'HEYvPI',
    description: 'This message appears as the title of the insert Key Result drawer',
  },

  successToastMessage: {
    defaultMessage: 'Resultado-chave criado com sucesso!',
    id: 'YznDPX',
    description: 'This message appears after the user creates a new key-result as a toast',
  },

  unexpectedErrorToastMessage: {
    defaultMessage: 'Desculpe, mas um erro inesperado aconteceu. Tente novamente mais tarde',
    id: '5fB6ei',
    description:
      'This message appears in an error toast after the user creates a new key-result but an unexpected error occurred',
  },
})
