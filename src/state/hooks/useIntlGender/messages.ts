import { defineMessages } from 'react-intl'

type IntlGenderMessage = 'maleGender' | 'femaleGender'

export default defineMessages<IntlGenderMessage>({
  maleGender: {
    defaultMessage: 'Masculino',
    id: 'hMXuTX',
    description: 'This text is used accross our platform to identify the male gender',
  },

  femaleGender: {
    defaultMessage: 'Feminino',
    id: '2RoJ81',
    description: 'This text is used accross our platform to identify the female gender',
  },
})
