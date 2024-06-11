import { defineMessages } from 'react-intl'

type NoticesBannerMessages = 'mainText' | 'buttonText'

export default defineMessages<NoticesBannerMessages>({
  mainText: {
    defaultMessage:
      'Conte para nós como está sendo sua experiência com a velocidade da plataforma:',
    id: 'zZwIvy',
    description: 'This message appears on the notices banner.',
  },
  buttonText: {
    defaultMessage: 'Responder',
    id: '7Czhi+',
    description: 'This message appears on action button of the notices banner',
  },
})
