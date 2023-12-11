import { useRecoilValue } from 'recoil'
import { useLocalStorage } from 'usehooks-ts'
import { v4 as uuidv4 } from 'uuid'

import {
  TASK_STATUS as ColumnType,
  Task,
  TASK_STATUS,
} from 'src/services/task-management/task-management.service'
import meAtom from 'src/state/recoil/user/me'

const useTaskCollection = () => {
  const myId = useRecoilValue(meAtom)

  return useLocalStorage<{
    [key in ColumnType]: Task[]
  }>('teamTasks', {
    PENDING: [
      {
        id: uuidv4(),
        boardId: uuidv4(),
        status: TASK_STATUS.PENDING,
        title: 'Marcar reunião com fornecedores de camisetas',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
        dueDate: new Date('2023-05-12'),
        priority: 1,
        owner: myId,
        attachments: ['http://arquivo.pdf'],
        supportTeamMembers: [
          '9ce87eda-64d1-4bfb-80a5-aa7811a04ea9',
          'f120ec45-150d-4e24-b99d-34df20a80c64',
        ],
        tags: ['PRODUTO'],
        nextTaskId: '2',
      },
    ],
    TO_DO: [
      {
        id: uuidv4(),
        boardId: uuidv4(),
        status: TASK_STATUS.TO_DO,
        title: 'Entrar em contato com empresa XYZ de eventos',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
        dueDate: new Date('2023-05-12'),
        priority: 2,
        owner: myId,
        attachments: ['http://arquivo.pdf'],
        supportTeamMembers: [
          '9ce87eda-64d1-4bfb-80a5-aa7811a04ea9',
          'f120ec45-150d-4e24-b99d-34df20a80c64',
        ],
        tags: ['PRODUTO'],
        nextTaskId: '2',
      },
    ],
    DOING: [
      {
        id: uuidv4(),
        boardId: uuidv4(),
        status: TASK_STATUS.DOING,
        title: 'Enviar mailing de cadastramento de conferencias e eventos  ',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
        dueDate: new Date('2023-05-12'),
        priority: 3,
        owner: myId,
        attachments: ['http://arquivo.pdf'],
        supportTeamMembers: [
          '9ce87eda-64d1-4bfb-80a5-aa7811a04ea9',
          'f120ec45-150d-4e24-b99d-34df20a80c64',
        ],
        tags: ['PRODUTO'],
        nextTaskId: '2',
      },
    ],
    DONE: [
      {
        id: uuidv4(),
        boardId: uuidv4(),
        status: TASK_STATUS.DONE,
        title: 'Cotação de participação da DesignConf 2023',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
        dueDate: new Date('2023-05-12'),
        priority: 4,
        owner: myId,
        attachments: ['http://arquivo.pdf'],
        supportTeamMembers: [
          '9ce87eda-64d1-4bfb-80a5-aa7811a04ea9',
          'f120ec45-150d-4e24-b99d-34df20a80c64',
        ],
        tags: ['PRODUTO'],
        nextTaskId: '2',
      },
    ],
  })
}

export default useTaskCollection
