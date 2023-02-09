import { defineMessages } from 'react-intl'

type IndicatorsAccordionButtonMessages = 'title' | 'subtitle' | 'icon'

export default defineMessages<IndicatorsAccordionButtonMessages>({
  title: {
    defaultMessage: 'Visão Geral do Time',
    id: 'oWLFIj',
    description:
      'This message is the title of the component that presents the Indicators of a team.',
  },
  subtitle: {
    defaultMessage: 'Entenda o engajamento e o progresso dos membros deste time no Bud',
    id: 'gpJ3OX',
    description:
      'This message is the subtitle of the component that presents the Indicators of a team.',
  },
  icon: {
    defaultMessage: 'Icone que apresenta três pessoas, representando um time.',
    id: '9Ni88b',
    description:
      'This message is the description of an icon that is presented as the title of the component that presents the Indicators of a team.',
  },
})
