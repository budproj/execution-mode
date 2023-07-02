import { defineMessages } from 'react-intl'

type NoticesBannerMessages = 'learMoreAboutRetrospectiveMessageBanner' | 'learMoreActionButton'

export default defineMessages<NoticesBannerMessages>({
  learMoreAboutRetrospectiveMessageBanner: {
    defaultMessage: 'Já checou seus OKRs hoje? Parece que tem novidade por lá... 👀',
    id: '5PP1DF',
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
