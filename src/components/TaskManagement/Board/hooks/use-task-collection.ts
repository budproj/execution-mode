import { useRecoilValue } from 'recoil'
import { useLocalStorage } from 'usehooks-ts'
import { v4 as uuidv4 } from 'uuid'

import {
  TASK_STATUS as ColumnType,
  Task,
} from 'src/services/task-management/task-management.service'
import meAtom from 'src/state/recoil/user/me'

const useTaskCollection = () => {
  const myId = useRecoilValue(meAtom)

  return useLocalStorage<{
    [key in ColumnType]: Task[]
  }>('teamTasks', {
    pending: [
      {
        id: uuidv4(),
        boardId: uuidv4(),
        status: ColumnType.pending,
        title: 'Marcar reunião com fornecedores de camisetas',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
        dueDate: new Date('2023-05-12'),
        priority: 1,
        initialDate: new Date(),
        owner: myId,
        attachments: ['http://arquivo.pdf'],
        supportTeamMembers: [
          '9ce87eda-64d1-4bfb-80a5-aa7811a04ea9',
          'f120ec45-150d-4e24-b99d-34df20a80c64',
        ],
        tags: ['tag1', 'tag2'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    toDo: [
      {
        id: uuidv4(),
        boardId: uuidv4(),
        status: ColumnType.toDo,
        title: 'Entrar em contato com empresa XYZ de eventos',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
        dueDate: new Date('2023-05-12'),
        priority: 2,
        initialDate: new Date(),
        owner: myId,
        attachments: ['http://arquivo.pdf'],
        supportTeamMembers: [
          '9ce87eda-64d1-4bfb-80a5-aa7811a04ea9',
          'f120ec45-150d-4e24-b99d-34df20a80c64',
        ],
        tags: ['tag1', 'tag2'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    doing: [
      {
        id: uuidv4(),
        boardId: uuidv4(),
        status: ColumnType.doing,
        title: 'Enviar mailing de cadastramento de conferencias e eventos  ',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
        dueDate: new Date('2023-05-12'),
        priority: 3,
        initialDate: new Date(),
        owner: myId,
        attachments: ['http://arquivo.pdf'],
        supportTeamMembers: [
          '9ce87eda-64d1-4bfb-80a5-aa7811a04ea9',
          'f120ec45-150d-4e24-b99d-34df20a80c64',
        ],
        tags: ['tag1', 'tag2'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    done: [
      {
        id: uuidv4(),
        boardId: uuidv4(),
        status: ColumnType.done,
        title: 'Cotação de participação da DesignConf 2023',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
        dueDate: new Date('2023-05-12'),
        priority: 4,
        initialDate: new Date(),
        owner: myId,
        attachments: ['http://arquivo.pdf'],
        supportTeamMembers: [
          '9ce87eda-64d1-4bfb-80a5-aa7811a04ea9',
          'f120ec45-150d-4e24-b99d-34df20a80c64',
        ],
        tags: ['tag1', 'tag2'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  })
}

export default useTaskCollection
