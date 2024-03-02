import { defineMessages } from 'react-intl'

type PrioritySelectMenuMessages = 'priotiryLabelMessage'

export default defineMessages<PrioritySelectMenuMessages>({
  priotiryLabelMessage: {
    defaultMessage:
      '{priority, select, 1 {Baixa prioridade} 2 {Média prioridade} 3 {Alta prioridade} other {Altíssima prioridade}}',
    id: '3Vp6v4',
    description: 'This message appears as the title of the insert Task drawer',
  },
})

// 'Resultado-chave {isEditing, select, true {editado} other {criado}} com sucesso!',
