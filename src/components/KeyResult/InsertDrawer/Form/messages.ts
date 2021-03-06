import { defineMessages } from 'react-intl'

type KeyResultInsertDrawerFormMessage =
  | 'firstInputLabel'
  | 'firstInputPlaceholder'
  | 'secondInputLabel'
  | 'secondInputPlaceholder'
  | 'thirdInputLabel'
  | 'fourthInputLabel'
  | 'fifthInputLabel'
  | 'sixthInputLabel'
  | 'firstActionButtonLabel'
  | 'secondActionButtonLabel'
  | 'invalidIconDesc'

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

  fourthInputLabel: {
    defaultMessage: 'Valor Inicial',
    id: 'WiYOXK',
    description: 'This label appears above the fourth input in our insert key-result drawer',
  },

  fifthInputLabel: {
    defaultMessage: 'Meta',
    id: 'L0c5bp',
    description: 'This label appears above the fifth input in our insert key-result drawer',
  },

  sixthInputLabel: {
    defaultMessage: 'Responsável',
    id: 'wiFglx',
    description: 'This label appears above the sixth input in our insert key-result drawer',
  },

  firstActionButtonLabel: {
    defaultMessage: 'Cancelar',
    id: 'VUKPKt',
    description:
      'This is a button label displayed inside the insert key-result drawer. This is the first button',
  },

  secondActionButtonLabel: {
    defaultMessage: 'Salvar',
    id: 'M0RYZa',
    description:
      'This is a button label displayed inside the insert key-result drawer. This is the second button',
  },

  invalidIconDesc: {
    defaultMessage: 'Um ícone de X indicando que os dados neste campo não são válidos',
    id: 't3VVHw',
    description:
      'This is used by screen readers to explain the X that appears when the users types a non-valid data in a given controlled field',
  },
})
