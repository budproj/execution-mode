import { MessageDescriptor, defineMessages } from 'react-intl'

type KeyResultListHeadMessages =
  | 'listHeadKeyResult'
  | 'listHeadObjective'
  | 'listHeadConfidenceLevel'
  | 'listHeadProgress'
  | 'listHeadCycle'
  | 'listHeadOwner'
  | 'listHeadConfidenceLevelColor'

export default defineMessages({
  listHeadKeyResult: {
    defaultMessage: 'Resultado-chave',
    id: 'fd6kjy',
    description: 'The text of the table head related to the KeyResult column',
  },

  listHeadObjective: {
    defaultMessage: 'Objetivo',
    id: '8LTdv4',
    description: 'The text of the table head related to the Objective column',
  },

  listHeadConfidenceLevel: {
    defaultMessage: 'Nivel de confiança',
    id: 'fbqKln',
    description: 'The text of the table head related to the Confidence Level column',
  },

  listHeadProgress: {
    defaultMessage: 'Progresso',
    id: 'kXNgkQ',
    description: 'The text of the table head related to the Progress column',
  },

  listHeadCycle: {
    defaultMessage: 'Ciclo',
    id: 'IGODpK',
    description: 'The text of the table head related to the Cycle column',
  },

  listHeadOwner: {
    defaultMessage: 'Dono',
    id: 'ycpCyI',
    description: 'The text of the table head related to the Owner column',
  },

  listHeadConfidenceLevelColor: {
    defaultMessage: 'Cor do Nível de Confiança',
    id: 'F33Lyk',
    description: 'The text of the table head related to the Confidence Level color column',
  },
}) as Record<KeyResultListHeadMessages, MessageDescriptor>
