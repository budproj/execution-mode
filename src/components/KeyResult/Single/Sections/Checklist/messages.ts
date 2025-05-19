import { defineMessages } from 'react-intl'

type KeyResultsSectionChecklistMessage =
  | 'heading'
  | 'collapseButtonDesc'
  | 'pendingColumnHeading'
  | 'todoColumnHeading'
  | 'doingColumnHeading'
  | 'doneColumnHeading'
  | 'addTaskButton'

export default defineMessages<KeyResultsSectionChecklistMessage>({
  heading: {
    defaultMessage: 'Tarefas',
    id: 'BQha3x',
    description: 'This is the title of our checklist section inside the key-result sidebar',
  },

  collapseButtonDesc: {
    defaultMessage: 'Uma seta que ao ser clicada expande a checklist deste resultado-chave',
    id: 'SsQRcF',
    description:
      'This message is used by screen readers to explain the collapse icon in our key-result sidebar on the checklist section',
  },
  pendingColumnHeading: {
    defaultMessage: 'pendências',
    id: 'pD5/TL',
    description: 'This message appears on header of the pending column',
  },

  todoColumnHeading: {
    defaultMessage: 'para fazer',
    id: 'Sz6ZOB',
    description: 'This message appears on header of the todo column',
  },

  doingColumnHeading: {
    defaultMessage: 'em andamento',
    id: 'MANxqE',
    description: 'This message appears on header of the doing column',
  },

  doneColumnHeading: {
    defaultMessage: 'concluído',
    id: 'rw4RIa',
    description: 'This message appears on header of the done column',
  },
  addTaskButton: {
    defaultMessage: 'nova tarefa',
    id: 'pfygkg',
    description: 'This message appears on the add task button',
  },
})
