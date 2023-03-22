import { defineMessages } from 'react-intl'

type teamHighlightTableMessages = 'teamHighlightsTableColumnHeaderMessage'

export default defineMessages<teamHighlightTableMessages>({
  teamHighlightsTableColumnHeaderMessage: {
    defaultMessage:
      '{columnAccessor, select, user {Usuário} team {Time} productivity {Produtividade na semana} roadblock {Bloqueios na semana} feeling {Sentimentos na semana} lastRetrospective {Última retrospectiva} lastAccess {Último acesso} other {OKRs}}',
    id: '4WREAh',
    description: 'This message appears in the header of each column of a Team Indicators table.',
  },
})
