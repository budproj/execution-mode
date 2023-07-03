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
      '{user} alterou {key, select, description {a} goal {a} other {o}} {key, select, title {título} initialValue {valor inicial} description {descrição} goal {meta} format {formato} type {tipo} ownerId {responsável} other {}}',
    id: 'oQbqDL',
    description: 'dsa',
  },

  updateKrModeCard: {
    defaultMessage: 'Resultado-chave publicado',
    id: 'TRwumR',
    description: 'dsa',
  },
})
