import { defineMessages } from 'react-intl'

type KeyResultsSectionTimelineCardCommentMessage =
  | 'cardType'
  | 'updatedDataCard'
  | 'updateKrModeCard'

export default defineMessages<KeyResultsSectionTimelineCardCommentMessage>({
  cardType: {
    defaultMessage: 'Comentário',
    id: '02lpnJ',
    description:
      'This text is displayed in some places in our timeline card, showing the type of the card in a friendly name',
  },
  updatedDataCard: {
    defaultMessage:
      '{user} alterou {key, select, DESCRIPTION {a} GOAL {a} other {o}} {key, select, TITLE {título} DESCRIPTION {descrição} GOAL {meta} FORMAT {formato} TYPE {tipo} other {}}',
    id: 'W0Z4Rj',
    description: 'dsa',
  },

  updateKrModeCard: {
    defaultMessage: 'Resultado-chave publicado',
    id: 'TRwumR',
    description: 'dsa',
  },
})
