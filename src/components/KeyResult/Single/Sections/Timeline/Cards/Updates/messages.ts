import { defineMessages } from 'react-intl'

type KeyResultsSectionTimelineCardCommentMessage =
  | 'cardType'
  | 'updatedDataCard'
  | 'updateKrModeCard'
  | 'createdTaskCard'

export default defineMessages<KeyResultsSectionTimelineCardCommentMessage>({
  cardType: {
    defaultMessage: 'Comentário',
    id: '02lpnJ',
    description:
      'This text is displayed in some places in our timeline card, showing the type of the card in a friendly name',
  },
  updatedDataCard: {
    defaultMessage:
      '{user} {key, select, createdTask {criou} active {} other {alterou}} {value, select, true {desarquivou} false {arquivou} other {}} {key, select, description {a} goal {a} createdTask {a} priority {a} active {a} other {o}} {key, select, title {título} initialValue {valor inicial} description {descrição} goal {meta} format {formato} type {tipo} ownerId {responsável} owner {responsável} createdTask {tarefa} status {status} dueDate {prazo} initialDate {início} supportTeamMembers {time de apoio} priority {prioridade} active {tarefa} other {}}',
    id: '2GMiov',
    description: 'dsa',
  },

  createdTaskCard: {
    defaultMessage: '{user} criou a tarefa',
    id: 'v0PKmP',
    description: 'dsa',
  },

  updateKrModeCard: {
    defaultMessage: 'Resultado-chave publicado',
    id: 'TRwumR',
    description: 'dsa',
  },
})
