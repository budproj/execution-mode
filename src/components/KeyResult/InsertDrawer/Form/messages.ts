import { defineMessages } from 'react-intl'

type KeyResultInsertDrawerFormMessage =
  | 'firstInputLabel'
  | 'firstInputPlaceholder'
  | 'secondInputLabel'
  | 'secondInputPlaceholder'
  | 'thirdInputLabel'

export default defineMessages<KeyResultInsertDrawerFormMessage>({
  firstInputLabel: {
    defaultMessage: 'Título',
    id: '6J+ZAo',
    description:
      'This label is displayed above the first input of our form inside the key-result insert drawer',
  },

  firstInputPlaceholder: {
    defaultMessage: 'Insira um título para este Resultado-chave',
    id: 'ZPSK4M',
    description: 'The placeholder for the first input in our key-result insert drawer form',
  },

  secondInputLabel: {
    defaultMessage: 'Descrição',
    id: '/xx1Eb',
    description:
      'This message is displayed as the label for the second input in our insert key-result drawer',
  },

  secondInputPlaceholder: {
    defaultMessage:
      'Se quiser, inclua uma descrição para ajudar seus colegas a entenderem por que esse resultado-chave é importante e como você pretende alcançá-lo.',
    id: 'Cu5tci',
    description:
      'This message is displayed as the placeholder for our second input in our key-result drawer',
  },

  thirdInputLabel: {
    defaultMessage: 'Formato do Resultado-chave',
    id: '0t238C',
    description: 'This label appears above the third input in our insert key-result drawer',
  },
})
