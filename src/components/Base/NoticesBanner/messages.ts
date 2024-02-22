import { defineMessages } from 'react-intl'

type NoticesBannerMessages = 'mainText' | 'buttonText'

export default defineMessages<NoticesBannerMessages>({
  mainText: {
    defaultMessage: 'Qual seu grau de satisfação com a velocidade da plataforma?',
    id: '68x4jj',
    description: 'This message appears on the notices banner.',
  },
  buttonText: {
    defaultMessage: 'Responda aqui',
    id: 'd8BSWu',
    description: 'This message appears on action button of the notices banner',
  },
})
