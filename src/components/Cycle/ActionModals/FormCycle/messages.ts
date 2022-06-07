import { defineMessages } from 'react-intl'

type CycleModalFormMessage =
  | 'nameCycleField'
  | 'stateCycleField'
  | 'cadenceCycleField'
  | 'parenteCycleField'
  | 'dateStartCycleField'
  | 'dateEndCycleField'
  | 'closeModalButton'
  | 'createCycleButton'
  | 'saveEditCycleButton'
  | 'activeCycleOption'
  | 'notActiveCycleOption'
  | 'quarterlyCadenceCycleOption'
  | 'yearlyCadenceCycleOption'

export default defineMessages<CycleModalFormMessage>({
  nameCycleField: {
    defaultMessage: 'Nome do ciclo',
    id: '9Y9dS0',
    description: 'The description for name cycle field',
  },

  stateCycleField: {
    defaultMessage: 'Estado atual',
    id: 'vyGEtA',
    description: 'The description for state cycle field',
  },
  cadenceCycleField: {
    defaultMessage: 'Cadência',
    id: 'OS8mCA',
    description: 'The description for cadence cycle field',
  },

  parenteCycleField: {
    defaultMessage: 'Ciclo pai',
    id: 'pQnPZP',
    description: 'The description for parent cycle field',
  },
  dateStartCycleField: {
    defaultMessage: 'Date de início',
    id: 'qGLpBy',
    description: 'The description for date-start cycle field',
  },
  dateEndCycleField: {
    defaultMessage: 'Data de fim',
    id: 'll4kYl',
    description: 'The description for date-end cycle field',
  },
  createCycleButton: {
    defaultMessage: 'Criar',
    id: 'zWpOXa',
    description: 'The button to create or edit a cycle on modal',
  },

  saveEditCycleButton: {
    defaultMessage: 'Salvar',
    id: 'TGP9cN',
    description: 'The button to create or edit a cycle on modal',
  },

  closeModalButton: {
    defaultMessage: 'Cancelar',
    id: 'ej/Q3X',
    description: 'The button to close the modal cycle',
  },

  activeCycleOption: {
    defaultMessage: 'Ativo',
    id: 'CS3a8I',
    description: 'This option makes an active cycle',
  },

  notActiveCycleOption: {
    defaultMessage: 'Inativo',
    id: 'CDO5jp',
    description: 'This option makes an not-active cycle',
  },

  quarterlyCadenceCycleOption: {
    defaultMessage: 'Trimestral',
    id: 'usAoP+',
    description: 'This option makes an cycle with quarterly cadence',
  },

  yearlyCadenceCycleOption: {
    defaultMessage: 'Anual',
    id: 'oh+3Gh',
    description: 'This option makes an cycle with yearly cadence',
  },
})
