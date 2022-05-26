import { defineMessages } from 'react-intl'

type SettingsCyclesPageMessage = 'subTitle' | 'createCycleButton' | 'pageDescription'

export default defineMessages<SettingsCyclesPageMessage>({
  subTitle: {
    defaultMessage: 'Ciclos de OKR ',
    id: '3q/E0t',
    description: 'The subtitle page.',
  },

  pageDescription: {
    defaultMessage:
      'Ciclos são os horizontes de tempo definidos para a estratégia.{breakingline}Recomendamos a criação de um ciclo anual para a empresa e um ciclo trimestral para os times.',
    id: 'Ny2Pia',
    description: 'The description page.',
  },

  createCycleButton: {
    defaultMessage: 'Criar Ciclo',
    id: 'Lxrv+d',
    description: 'This button is used to create a new cycle.',
  },
})
