import { defineMessages } from 'react-intl'

type CreateTeamMessage =
  | 'teamNameLabel'
  | 'teamNamePlaceholder'
  | 'teamGenderLabel'
  | 'teamGenderPlaceholder'
  | 'teamGenderNeutral'
  | 'teamGenderFemale'
  | 'teamGenderMale'

export default defineMessages<CreateTeamMessage>({
  teamNameLabel: {
    defaultMessage: 'Nome da empresa',
    id: '/6mxm9',
    description: 'The label of the company name while creating a new workspace',
  },

  teamNamePlaceholder: {
    defaultMessage: 'Nome',
    id: 'KGQV/U',
    description: 'The company name input placeholder while creating a new workspace',
  },

  teamGenderLabel: {
    defaultMessage: 'Gênero da empresa',
    id: '68qL+a',
    description: 'The label of the company gender while creating a new workspace',
  },

  teamGenderPlaceholder: {
    defaultMessage: 'Gênero',
    id: 'aIGly+',
    description: 'The company gender input placeholder while creating a new workspace',
  },

  teamGenderNeutral: {
    defaultMessage: 'Neutro',
    id: 'nWz8Nt',
    description: 'The neutral gender for the company while creating a new workspace',
  },

  teamGenderFemale: {
    defaultMessage: 'Feminino',
    id: 'OMUZ7w',
    description: 'The female gender for the company while creating a new workspace',
  },

  teamGenderMale: {
    defaultMessage: 'Masculino',
    id: 'WIR0FJ',
    description: 'The male gender for the company while creating a new workspace',
  },
})
