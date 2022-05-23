import { defineMessages } from 'react-intl'

type GuideListCreateOkr =
  | 'guideListCreateOkrHeadTitle'
  | 'headTitleGuideCreateOkr'
  | 'guideDescriptionToCreateObjectives'
  | 'guideDescriptionToCreateObjectives2'
  | 'guideDescriptionToCreateObjectives3'
  | 'guideTitleToCreateObjectives'
  | 'guideTitleToCreateObjectives2'
  | 'guideTitleToCreateObjectives3'
  | 'linkButtonMessage'

export default defineMessages<GuideListCreateOkr>({
  guideListCreateOkrHeadTitle: {
    defaultMessage: 'Precisando de inspiração? Lembre-se: os melhores objetivos são...',
    id: 'vzHp1e',
    description:
      'This is the title presented in the component that guides you in creating Objectives.',
  },

  headTitleGuideCreateOkr: {
    defaultMessage: 'Veja nossos exemplos de OKRs',
    id: 'x/2y46',
    description: 'This link takes you to the page with guidelines on creating OKRs.',
  },

  guideDescriptionToCreateObjectives: {
    defaultMessage:
      'Representam as mais altas prioridades e comunicam essa direção com bastante clareza.',
    id: 'qhchMM',
    description: 'This card guides the creation of Objectives.',
  },
  guideDescriptionToCreateObjectives2: {
    defaultMessage:
      'São ousados, desafiadores e devem gerar um certo nível de desconforto por não serem fáceis de alcançar.',
    id: 'BTaFbJ',
    description: 'This card guides the creation of Objectives.',
  },
  guideDescriptionToCreateObjectives3: {
    defaultMessage:
      'Devem descrever uma visão de futuro atraente e motivante que valha a pena o esforço para alcançar.',
    id: 'Fb0ZAK',
    description: 'This card guides the creation of Objectives.',
  },

  guideTitleToCreateObjectives: {
    defaultMessage: 'Significativos',
    id: '3ye3aF',
    description: 'This title guides the creation of Objectives.',
  },

  guideTitleToCreateObjectives2: {
    defaultMessage: 'Audaciosos',
    id: 'tj3TRS',
    description: 'This title guides the creation of Objectives.',
  },

  guideTitleToCreateObjectives3: {
    defaultMessage: 'Inspiradores',
    id: 'lQkUTL',
    description: 'This title guides the creation of Objectives.',
  },

  linkButtonMessage: {
    defaultMessage: ' Veja nossos exemplos de OKRs',
    id: 'JNiINj',
    description: 'This button redirects to the page that teaches about OKRs.',
  },
})
