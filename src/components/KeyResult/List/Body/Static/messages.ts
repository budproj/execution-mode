import { MessageDescriptor, defineMessages } from 'react-intl'

type KeyResultListBodyStaticMessages = 'teamAtWorkImageAlt' | 'teamAtWorkImageLabel'

export default defineMessages({
  teamAtWorkImageAlt: {
    defaultMessage:
      'Um desenho de uma mulher e um homem, cada qual segudando um pedaço de um quebra-cabeça e colaborando para montá-lo',
    id: 'mcWqy7',
    description: 'The alternative text explaining our team at work image',
  },

  teamAtWorkImageLabel: {
    defaultMessage: 'Esse objetivo não tem nenhum resultado-chave',
    id: '/CiLko',
    description: 'The label message that is displayed below our team at work image',
  },
}) as Record<KeyResultListBodyStaticMessages, MessageDescriptor>
