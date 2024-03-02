import { defineMessages } from 'react-intl'

type BoardMessages =
  | 'pendingColumnHeading'
  | 'todoColumnHeading'
  | 'doingColumnHeading'
  | 'doneColumnHeading'
  | 'addTaskButton'

export default defineMessages<BoardMessages>({
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
