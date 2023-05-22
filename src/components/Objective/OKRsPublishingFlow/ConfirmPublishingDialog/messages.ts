import { defineMessages } from 'react-intl'

type ConfirmPublishingOKRMessages =
  | 'keyword'
  | 'confirmationLabel'
  | 'secondStageTitle'
  | 'secondStageDescription'
  | 'inputLabel'
  | 'publishOKRSuccessMessage'

export default defineMessages<ConfirmPublishingOKRMessages>({
  keyword: {
    defaultMessage: 'PUBLICAR',
    id: 'FUoyU3',
    description:
      'This is the keyword that the user needs to enter to confirm their action of publishing an OKR.',
  },

  confirmationLabel: {
    defaultMessage: 'Publicar OKR',
    id: 'tIbXUc',
    description:
      'This message appears on the button the user uses to confirm their action of posting an OKR.',
  },

  secondStageTitle: {
    defaultMessage: 'Atenção! {breakline}Você está prestes a publicar este OKR',
    id: '3AEvLQ',
    description:
      'This message appears in the title of the modal that the user uses to confirm their action of posting an OKR.',
  },

  secondStageDescription: {
    defaultMessage:
      'Ao realizar essa ação, o OKR entrará no ciclo atual e começará a ter seu progresso contabilizado. Todos os feedbacks serão mantidos dentro dos KRs.',
    id: '5OEJ9F',
    description:
      'This message appears in the description of the modal that the user uses to confirm their action of posting an OKR.',
  },

  inputLabel: {
    defaultMessage: 'CONFIRME SUA AÇÃO',
    id: 'xq1mQp',
    description:
      'This message appears in the label of input that the user uses to confirm their action of posting an OKR.',
  },

  publishOKRSuccessMessage: {
    defaultMessage: 'Seu OKR foi publicado com sucesso!',
    id: 'OdFISq',
    description:
      'This message appears in the toast messat that indicates the success on publish an OKR.',
  },
})
