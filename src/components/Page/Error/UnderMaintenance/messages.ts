import { defineMessages } from 'react-intl'

type UnderMaintenanceErrorPageMessage = 'title' | 'description' | 'imageAlt' | 'metaTitle'

export default defineMessages<UnderMaintenanceErrorPageMessage>({
  title: {
    defaultMessage: 'Estamos trabalhando em melhorias para você! :)',
    id: 'ze3hqu',
    description: 'The title displayed in our under maintenance error page',
  },

  description: {
    defaultMessage:
      'O Bud vai ficar fora do ar durante algumas horas enquanto arrumamos a casa. Esperamos estar de volta até: <highlight>{date} às {hour}h</highlight> Até lá! :)',
    id: 'upeS+T',
    description: 'This message is displayed as a description in our under maintenance error page',
  },

  imageAlt: {
    defaultMessage: 'O desenho de uma caixa fechada, ilustrando que estamos em manutenção',
    id: 'z4Qy+J',
    description:
      'This message is the alt message for our box drawing in the under maintenance error page',
  },

  metaTitle: {
    defaultMessage: 'Em manutenção | bud ',
    id: 'TzHlPJ',
    description:
      'The page title of our under maintenance error page that is displayed in the browser tab',
  },
})
