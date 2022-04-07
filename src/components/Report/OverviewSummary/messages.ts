import { defineMessages } from 'react-intl'

type CreateFormMessage = 'emptyMessage' | 'projectProgress'

export default defineMessages<CreateFormMessage>({
  emptyMessage: {
    defaultMessage: 'Seu time ainda não tem nenhum resultado-chave anual',
    id: '4idFSi',
    description: 'teste',
  },

  projectProgress: {
    defaultMessage: 'Progresso: {progress}%',
    id: 'zm6f8O',
    description: 'teste 2',
  },
})
