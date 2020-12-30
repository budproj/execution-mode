import { MessageDescriptor, defineMessages } from 'react-intl'

type CompanyProgressOverviewBodyStampProgressIncreaseMessages =
  | 'arrowUpIconDesc'
  | 'titleLabel'
  | 'descriptionText'

export default defineMessages({
  arrowUpIconDesc: {
    defaultMessage:
      'Um ícone de seta para cima, representando o quanto sua empresa evolui na última semana',
    id: 'w18rI2',
    description: 'This message is used by screen readers to explain our arrow up',
  },

  titleLabel: {
    defaultMessage: 'Evoluindo em <highlight>{progress}%</highlight>',
    id: 'IkA9uV',
    description:
      'This label appears in our stamp title. It represents how much your company has increased since last week',
  },

  descriptionText: {
    defaultMessage: 'Desde a última segunda-feira',
    id: 'SjGqdc',
    description: 'This helper texts explains since when we are calculating your company progress',
  },
}) as Record<CompanyProgressOverviewBodyStampProgressIncreaseMessages, MessageDescriptor>
