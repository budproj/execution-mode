import { defineMessages } from 'react-intl'

type NoticesBannerMessages = 'learMoreAboutRetrospectiveMessageBanner' | 'learMoreActionButton'

export default defineMessages<NoticesBannerMessages>({
  learMoreAboutRetrospectiveMessageBanner: {
    defaultMessage: 'Venha saber mais sobre as novidades de bud no nosso webinar dia 5 de Outubro!',
    id: '7X4Xpn',
    description:
      'This message appears on the news banner to invite the user to learn about the Spotlight feature.',
  },
  learMoreActionButton: {
    defaultMessage: 'Inscreva-se aqui',
    id: 'ktDa/m',
    description:
      'This message appears on action button that redirect the user to company page on Spotlight tab',
  },
})
