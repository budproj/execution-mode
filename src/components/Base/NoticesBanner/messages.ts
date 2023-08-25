import { defineMessages } from 'react-intl'

type NoticesBannerMessages = 'learMoreAboutRetrospectiveMessageBanner' | 'learMoreActionButton'

export default defineMessages<NoticesBannerMessages>({
  learMoreAboutRetrospectiveMessageBanner: {
    defaultMessage:
      'Está construindo seus OKRs? Conheça o novo Modo Rascunho e colabore com seu time!',
    id: '4+YuJi',
    description:
      'This message appears on the news banner to invite the user to learn about the Spotlight feature.',
  },
  learMoreActionButton: {
    defaultMessage: 'Conferir',
    id: 'Jt0weE',
    description:
      'This message appears on action button that redirect the user to company page on Spotlight tab',
  },
})
