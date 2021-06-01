import { defineMessages } from 'react-intl'

type KeyResultInsertDrawerMessage = 'title' | 'successToastMessage'

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
})
