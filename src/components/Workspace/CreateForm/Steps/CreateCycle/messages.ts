import { defineMessages } from 'react-intl'

type CreateCycleMessage =
  | 'yearlyCyclePeriodLabel'
  | 'yearlyCyclePeriodPlaceholder'
  | 'yearlyCycleDateStartLabel'
  | 'yearlyCycleDateStartPlaceholder'
  | 'yearlyCycleDateEndLabel'
  | 'yearlyCycleDateEndPlaceholder'
  | 'quarterlyCyclePeriodLabel'
  | 'quarterlyCyclePeriodPlaceholder'
  | 'quarterlyCycleDateStartLabel'
  | 'quarterlyCycleDateStartPlaceholder'
  | 'quarterlyCycleDateEndLabel'
  | 'quarterlyCycleDateEndPlaceholder'

export default defineMessages<CreateCycleMessage>({
  yearlyCyclePeriodLabel: {
    defaultMessage: 'Nome do período anual',
    id: '7uQQbf',
    description: 'The label of the company yearly period while creating a new workspace',
  },

  yearlyCyclePeriodPlaceholder: {
    defaultMessage: 'Período',
    id: 'lCQz97',
    description: 'The company yearly period input placeholder while creating a new workspace',
  },

  yearlyCycleDateStartLabel: {
    defaultMessage: 'Dia de início do período anual',
    id: 'P0g9QE',
    description: 'The label of the company yearly date start while creating a new workspace',
  },

  yearlyCycleDateStartPlaceholder: {
    defaultMessage: 'Data de início',
    id: 'yK87+y',
    description: 'The company yearly date start input placeholder while creating a new workspace',
  },

  yearlyCycleDateEndLabel: {
    defaultMessage: 'Dia de fim do período anual',
    id: 'mK9HFR',
    description: 'The label of the company yearly date end while creating a new workspace',
  },

  yearlyCycleDateEndPlaceholder: {
    defaultMessage: 'Data de fim',
    id: 'zFQPs9',
    description: 'The company yearly date end input placeholder while creating a new workspace',
  },

  quarterlyCyclePeriodLabel: {
    defaultMessage: 'Nome do período trimestral',
    id: 'ah2n1K',
    description: 'The label of the company quarterly period while creating a new workspace',
  },

  quarterlyCyclePeriodPlaceholder: {
    defaultMessage: 'Período',
    id: 'K03Z5V',
    description: 'The company quarterly period input placeholder while creating a new workspace',
  },

  quarterlyCycleDateStartLabel: {
    defaultMessage: 'Dia de início do período trimestral',
    id: '8EZRzi',
    description: 'The label of the company quarterly date start while creating a new workspace',
  },

  quarterlyCycleDateStartPlaceholder: {
    defaultMessage: 'Data de início',
    id: 'Cli69X',
    description:
      'The company quarterly date start input placeholder while creating a new workspace',
  },

  quarterlyCycleDateEndLabel: {
    defaultMessage: 'Dia de fim do período trimestral',
    id: 'k4LTU8',
    description: 'The label of the company quarterly date end while creating a new workspace',
  },

  quarterlyCycleDateEndPlaceholder: {
    defaultMessage: 'Data de fim',
    id: '9OSi6W',
    description: 'The company quarterly date end input placeholder while creating a new workspace',
  },
})
