import { defineMessages } from 'react-intl'

type CreateFormMessage = 'emptyMessage' | 'projectProgress' | `projectProgressTooltip`

export default defineMessages<CreateFormMessage>({
  emptyMessage: {
    defaultMessage: 'Seu time ainda não tem nenhum resultado-chave anual',
    id: '9O5Xaa',
    description: 'Message to show when there are no summary results',
  },

  projectProgress: {
    defaultMessage: 'Esperado: {progress}%',
    id: '3xZZCI',
    description: 'Message to show the expetected progress of the project',
  },

  projectProgressTooltip: {
    defaultMessage:
      'Em OKRs, costuma-se mirar em atingir ao menos 70% das metas. Para atingir esse patamar até o fim do ciclo, o progresso atual esperado é de 67%.',
    id: 'YETxgV',
    description: 'Tooltip message to show when hovering the help icon on projected progress',
  },
})
