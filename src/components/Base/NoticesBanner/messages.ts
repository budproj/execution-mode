import { defineMessages } from 'react-intl'

type NoticesBannerMessages = 'mainText' | 'buttonText'

export default defineMessages<NoticesBannerMessages>({
  mainText: {
    defaultMessage:
      'Nosso sistema está enfrentando problemas de performance no momento. Estamos trabalhando para restaurar o funcionamento normal. Agradecemos a compreensão.',
    id: 'ADeaSS',
    description: 'This message appears on the notices banner.',
  },
  buttonText: {
    defaultMessage: 'Responda aqui',
    id: 'd8BSWu',
    description: 'This message appears on action button of the notices banner',
  },
})
