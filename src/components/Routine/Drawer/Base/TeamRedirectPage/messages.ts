import { defineMessages } from 'react-intl'

type TeamRedirectPageMessages = 'callToActionPageDescription' | 'title'

export default defineMessages<TeamRedirectPageMessages>({
  callToActionPageDescription: {
    defaultMessage:
      '{title} \n\nSua resposta foi registrada e já está disponível para visualização nos times dos quais você faz parte. \n\nPara a página de qual deles você deseja ir?',
    id: 'hUC0Q7',
    description:
      'This text appears on the team redirection page after the user responds to the routines form',
  },

  title: {
    defaultMessage: 'Pronto!',
    id: '3cM4+o',
    description:
      'This text appears on the team redirection page after the user responds to the routines form',
  },
})
