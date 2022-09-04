import { defineMessages } from 'react-intl'

type RoutineDrawerMessages =
  | 'submitFormButtonDesc'
  | 'sendFormAnswersMessageButton'
  | 'afterButtonForm'
  | 'startButtonForm'
  | 'previousQuestionButtonFormIconDesc'
  | 'afterQuestionButtonFormIconDesc'

export default defineMessages<RoutineDrawerMessages>({
  submitFormButtonDesc: {
    defaultMessage: 'Aperte',
    id: 'dLMgRx',
    description:
      'This message appears in the description of the submit the response button in the routines form.',
  },

  sendFormAnswersMessageButton: {
    defaultMessage: 'Enviar',
    id: 'PKRdQG',
    description: 'This message appears in the button to send routine form answers.',
  },

  afterButtonForm: {
    defaultMessage: 'Próximo',
    id: 'R5fgoj',
    description:
      'This message appears on the button to move to the next question in the routines form.',
  },

  startButtonForm: {
    defaultMessage: 'Começar',
    id: 'hwBdQ9',
    description:
      'This message appears on the button the user uses to start responding to the routine form.',
  },

  previousQuestionButtonFormIconDesc: {
    defaultMessage:
      'Um botão que ao ser clicado direciona o usuário para a questão anterior no formulário de rotinas.',
    id: '/cw+5N',
    description:
      'This message is the description of a button icon that, when clicked, directs the user to the previous question in the routines form.',
  },

  afterQuestionButtonFormIconDesc: {
    defaultMessage:
      'Um botão que ao ser clicado direciona o usuário para a questão seguinte no formulário de rotinas.',
    id: 'NaLzV2',
    description:
      'This message is the description of a button icon that, when clicked, directs the user to the next question in the routines form.',
  },
})
