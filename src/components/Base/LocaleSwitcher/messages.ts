import { defineMessages } from 'react-intl'

type LocaleSwitcherMessage = 'ptBRLabel' | 'enUSLabel'

export default defineMessages<LocaleSwitcherMessage>({
  ptBRLabel: {
    defaultMessage: 'Português',
    id: 'vbnV7B',
    description:
      'This message is used as the label for the portuguese language in our locale switcher',
  },

  enUSLabel: {
    defaultMessage: 'Inglês',
    id: '2iSLX9',
    description:
      'This message is used as the label for the english language in our locale switcher',
  },
})
