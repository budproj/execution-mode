import { defineMessages } from 'react-intl'

type UnderMaintenanceMessage = 'title' | 'description' | 'imageAlt'

export default defineMessages<UnderMaintenanceMessage>({
  title: {
    defaultMessage: 'Estamos trabalhando em melhorias para você! :)',
    id: '5ft2YT',
    description: 'The title displayed in our under maintenance page',
  },

  description: {
    defaultMessage:
      'O Bud vai ficar fora do ar durante algumas horas enquanto arrumamos a casa. Esperamos estar de volta até: <highlight>{date} às {hour}h</highlight> Até lá! :)',
    id: 'iqfmjJ',
    description: 'This message is displayed as a description in our under maintenance page',
  },

  imageAlt: {
    defaultMessage: 'O desenho de uma caixa fechada, ilustrando que estamos em manutenção',
    id: 'aN6zsb',
    description:
      'This message is the alt message for our box drawing in the under maintenance page',
  },
})
