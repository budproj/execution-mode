import { defineMessages } from 'react-intl'

type deleteRoutineAnswerMessages =
  | 'successDeleteToastMessage'
  | 'warningDeleteToastMessage'
  | 'aRequiredQuestionHasNotBeenAnswered'

export default defineMessages<deleteRoutineAnswerMessages>({
  successDeleteToastMessage: {
    defaultMessage: 'Resposta deletada com sucesso!',
    id: 'sX1k+9',
    description:
      'This message appears in a toast indicating success in deleting a routines response.',
  },
  warningDeleteToastMessage: {
    defaultMessage: 'Não foi possível deletar a resposta!',
    id: 'uxjg0W',
    description:
      'This message appears in a toast indicating that it was not possible to delete a routines response.',
  },
  aRequiredQuestionHasNotBeenAnswered: {
    defaultMessage: 'Essa pergunta é obrigatória!',
    id: '1lccXL',
    description: 'This message appears to indicate that a required question has not been answered.',
  },
})
