import { defineMessages } from 'react-intl'

type NewsBannerMessages = 'newsBannerTitle' | 'newsBannerDescription' | 'newsBannerButton'

export default defineMessages<NewsBannerMessages>({
  newsBannerTitle: {
    defaultMessage: 'Organize suas atividades no novo módulo de gestão de tarefas!',
    id: 'Y0d9br',
    description:
      'This message appears on the news banner to invite the user to learn about the Spotlight feature.',
  },
  newsBannerDescription: {
    defaultMessage:
      'Agora você pode fazer a gestão das atividades da rotina do seu time também na bud. Visite a página do seu time e explore a aba de tarefas! Crie tarefas e acompanhe o andamento dos seus projetos em um só lugar :)',
    id: '1EdvvO',
    description:
      'This message appears on action button that redirect the user to company page on Spotlight tab',
  },
  newsBannerButton: {
    defaultMessage: 'Saiba Mais',
    id: 'xabV3g',
    description:
      'This message appears on action button that redirect the user to company page on Spotlight tab',
  },
})
