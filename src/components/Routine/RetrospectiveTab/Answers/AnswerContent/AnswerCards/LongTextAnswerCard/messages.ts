import { defineMessages } from 'react-intl'

type HistoryAnswersCardMessages = 'starIconDesc' | 'targetIconDesc' | 'writeIconDesc'

export default defineMessages<HistoryAnswersCardMessages>({
  starIconDesc: {
    defaultMessage:
      'Um ícone de uma estrela, que aparece junto com a pergunta sobre as principais conquistas que o usuário teve na semana.',
    id: 'mfowjk',
    description: 'The alternative text explaining our graphic icon',
  },

  targetIconDesc: {
    defaultMessage:
      'Um ícone de um alvo, que aparece junto com a pergunta de quais os focos do usuário para próxima semana.',
    id: '7WlK+y',
    description:
      'This message appears as the title of the card that lists the history of retrospectives answered by a user.',
  },
  writeIconDesc: {
    defaultMessage:
      'Um ícone de um lápix, que aparece junto com a pergunta de algum recado que o usuário deixou para o time',
    id: '9CP8fU',
    description: 'The alternative text explaining our graphic icon',
  },
})
