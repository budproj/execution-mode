import { defineMessages } from 'react-intl'

type KeyResultsSectionChecklistMessage =
  | 'heading'
  | 'newCheckMarkButtonLabel'
  | 'newCheckMarkButtonIconDescription'
  | 'draftCheckMarkDescription'

export default defineMessages<KeyResultsSectionChecklistMessage>({
  heading: {
    defaultMessage: 'Check-list',
    id: 'PktsGq',
    description: 'This is the title of our checklist section inside the key-result sidebar',
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

  draftCheckMarkDescription: {
    defaultMessage: 'Novo item',
    id: 'qYpqgw',
    description: 'This is the description used as default by a check mark when we add a new item',
  },
})
