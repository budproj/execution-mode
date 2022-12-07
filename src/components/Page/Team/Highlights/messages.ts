import { defineMessages } from 'react-intl'

type ExploreTeamHightlightsMessage =
  | 'title'
  | 'teamMembersHighlightTitleSection'
  | 'teamKRsHighlightTitleSection'
  | 'cardTitle'

export default defineMessages<ExploreTeamHightlightsMessage>({
  title: {
    defaultMessage: 'Destaques',
    id: 'X9J+2h',
    description: 'This message is displayed inside the explore page, above the highlights section',
  },
  teamMembersHighlightTitleSection: {
    defaultMessage: 'Pontos de atenção nos membros do time',
    id: 'ivvae0',
    description: 'This message appears in the title of the team member attention points section.',
  },
  teamKRsHighlightTitleSection: {
    defaultMessage: 'Pontos de atenção nos resultados-chave',
    id: '6cUb9x',
    description: 'This message appears in the title of the team KRs attention points section.',
  },
  cardTitle: {
    defaultMessage:
      '{type, select, feeling {desanimados} productivity {baixa produtividade} roadblock {bloqueio} checkin {check-in atrasado} confidence {baixa confiança} krmembers {membros sem krs} barrier {barreira} other {}}',
    id: 'WOh2vc',
    description: 'The title of the cards',
  },
})
