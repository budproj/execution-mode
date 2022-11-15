import { defineMessages } from 'react-intl'

type NoticesBannerMessages = 'learMoreAboutRetrospectiveMessageBanner' | 'learMoreActionButton'

export default defineMessages<NoticesBannerMessages>({
  learMoreAboutRetrospectiveMessageBanner: {
    defaultMessage: 'Como foi sua semana? Coloque sua Retrospectiva em dia',
    id: 'Yjqtno',
    description:
      'This message appears on the news banner to invite the user to learn about the Retrospective feature.',
  },
  learMoreActionButton: {
    defaultMessage: 'Saiba mais',
    id: 'uveo/4',
    description:
      'This message appears on action button that redirect the user to company page on Retrospective tab',
  },
})
