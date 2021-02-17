import { defineMessages } from 'react-intl'

type CompanyProgressOverviewBodyStampProgressIncreaseMessage =
  | 'arrowUpIconDesc'
  | 'arrowDownIconDesc'
  | 'lineIconDesc'
  | 'titleLabel'
  | 'descriptionText'

export default defineMessages<CompanyProgressOverviewBodyStampProgressIncreaseMessage>({
  arrowUpIconDesc: {
    defaultMessage:
      'Um ícone de seta para cima, representando o quanto sua empresa evolui na última semana',
    id: 't6KyQZ',
    description: 'This message is used by screen readers to explain our arrow up icon',
  },

  arrowDownIconDesc: {
    defaultMessage:
      'Um ícone de seta para baixo, representando o quanto sua empresa regrediu na última semana',
    id: '89ola3',
    description: 'This message is used by screen readers to explain our arrow down icon',
  },

  lineIconDesc: {
    defaultMessage:
      'Um ícone de uma linha reta na horizontal, representando que sua empresa não evolui desde o último evento de check-in',
    id: 'iPv+uj',
    description: 'This message is used by screen readers to explain our line icon',
  },

  titleLabel: {
    defaultMessage:
      '{progress, select, 0 {Sem variação} other {Variação de <highlight>{signal}{progress}%</highlight>}}',
    id: 'J+UxkH',
    description:
      'This label appears in our stamp title. It represents how much your company has increased since last week',
  },

  descriptionText: {
    defaultMessage: 'Em relação a última sexta-feira',
    id: 'qYgVuC',
    description: 'This helper texts explains since when we are calculating your company progress',
  },
})
