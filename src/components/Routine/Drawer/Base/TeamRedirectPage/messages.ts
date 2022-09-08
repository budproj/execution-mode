import { defineMessages } from 'react-intl'

type TeamRedirectPageMessages = 'callToActionPageDescription' | 'title'

export default defineMessages<TeamRedirectPageMessages>({
  callToActionPageDescription: {
    defaultMessage:
      '{title} \n\nSua resposta foi registrada e já está disponível para \nvisualização nos times dos quais você faz parte. \n\nPara a página de qual deles você deseja ir?',
    id: '5Vuq/6',
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
