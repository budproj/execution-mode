import { defineMessages } from 'react-intl'

type ActionButtonsMessages =
  | 'removeIconDescription'
  | 'newCheckMarkButtonLabel'
  | 'newCheckMarkButtonIconDescription'

export default defineMessages<ActionButtonsMessages>({
  removeIconDescription: {
    defaultMessage: 'Um ícone de "x". Ao clicar nele você irá remover esse item da checklist',
    id: 'sSCvSb',
    description:
      'This text is used by screen readers inside our key-result drawer to describe the X icon to remove a given item from the checklist',
  },

  newCheckMarkButtonLabel: {
    defaultMessage: 'Adicionar novo item',
    id: 'zennqC',
    description: 'This label appears in our key-result sidebar drawer, in the end of our checklist',
  },

  newCheckMarkButtonIconDescription: {
    defaultMessage:
      'Um ícone do sinal de positivo que, ao clicar, irá adicionar um novo item na checklist',
    id: 'e2FL3I',
    description:
      'This is used by screen readers to understand the insert new check mark icon in our key-result drawer',
  },
})
