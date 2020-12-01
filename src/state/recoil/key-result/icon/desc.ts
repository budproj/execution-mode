import { MessageDescriptor } from 'react-intl'
import { atomFamily } from 'recoil'

import { PREFIX } from './constants'
import { selectKeyResultIconDescBasedOnDrawing } from './selectors'
import { KeyResultIconDesc, KeyResultIconDrawing } from './types'

const KEY = `${PREFIX}::DESC`

const descGroup: KeyResultIconDesc = {
  Activity: {
    defaultMessage: 'Um ícone arredondado com um gráfico de linha ao centro',
    description:
      'The desc message for the Activity icon. This icon is used to ilustrate our key results',
  },
  Bookmark: {
    defaultMessage: 'Um ícone de marcador de página',
    description:
      'The desc message for the Bookmark icon. This icon is used to ilustrate our key results',
  },
  Calendar: {
    defaultMessage: 'Um ícone de calendário',
    description:
      'The desc message for the Calendar icon. This icon is used to ilustrate our key results',
  },
  Delete: {
    defaultMessage: 'Um ícone de lata de lixo',
    description:
      'The desc message for the Delete icon. This icon is used to ilustrate our key results',
  },
  Discovery: {
    defaultMessage: 'Um ícone de bussúla',
    description:
      'The desc message for the Discovery icon. This icon is used to ilustrate our key results',
  },
  Document: {
    defaultMessage: 'Um ícone de documento de texto',
    description:
      'The desc message for the Document icon. This icon is used to ilustrate our key results',
  },
  EditSquare: {
    defaultMessage: 'Um ícone de quadrado arredondado com um lápis',
    description:
      'The desc message for the EditSquare icon. This icon is used to ilustrate our key results',
  },
  Folder: {
    defaultMessage: 'Um ícone de pasta',
    description:
      'The desc message for the Folder icon. This icon is used to ilustrate our key results',
  },
  Game: {
    defaultMessage: 'Um ícone de controle de video game',
    description:
      'The desc message for the Game icon. This icon is used to ilustrate our key results',
  },
  Graph: {
    defaultMessage: 'Um ícone de gráfico de pizza',
    description:
      'The desc message for the Graph icon. This icon is used to ilustrate our key results',
  },
  Heart: {
    defaultMessage: 'Um ícone de coração',
    description:
      'The desc message for the Heart icon. This icon is used to ilustrate our key results',
  },
  Location: {
    defaultMessage: 'Um ícone de pin de localização',
    description:
      'The desc message for the Location icon. This icon is used to ilustrate our key results',
  },
  Message: {
    defaultMessage: 'Um ícone de mensagem',
    description:
      'The desc message for the Message icon. This icon is used to ilustrate our key results',
  },
  Scan: {
    defaultMessage: 'Um ícone de scanner',
    description:
      'The desc message for the Scan icon. This icon is used to ilustrate our key results',
  },
  Search: {
    defaultMessage: 'Um ícone de busca',
    description:
      'The desc message for the Search icon. This icon is used to ilustrate our key results',
  },
  TicketStar: {
    defaultMessage: 'Um ícone de ingresso de cinema',
    description:
      'The desc message for the TicketStar icon. This icon is used to ilustrate our key results',
  },
  TimesSquare: {
    defaultMessage: 'Um ícone de relógio',
    description:
      'The desc message for the TimesSquare icon. This icon is used to ilustrate our key results',
  },
  Video: {
    defaultMessage: 'Um ícone de video',
    description:
      'The desc message for the Video icon. This icon is used to ilustrate our key results',
  },
  Voice: {
    defaultMessage: 'Um ícone de microfone',
    description:
      'The desc message for the Voice icon. This icon is used to ilustrate our key results',
  },
  Wallet: {
    defaultMessage: 'Um ícone de carteira',
    description:
      'The desc message for the Wallet icon. This icon is used to ilustrate our key results',
  },
}

const desc = atomFamily<MessageDescriptor, KeyResultIconDrawing>({
  key: KEY,
  default: selectKeyResultIconDescBasedOnDrawing(descGroup),
})

export default desc
