import { defineMessages } from 'react-intl'

type NoticesBannerMessages = 'mainText' | 'buttonText'

export default defineMessages<NoticesBannerMessages>({
  mainText: {
    defaultMessage: 'Como está sendo sua experiência com a bud? Nos conte nesse formulário rápido:',
    id: 'Rj3usm',
    description: 'This message appears on the notices banner.',
  },
  buttonText: {
    defaultMessage: 'Responda aqui',
    id: 'd8BSWu',
    description: 'This message appears on action button of the notices banner',
  },
})
