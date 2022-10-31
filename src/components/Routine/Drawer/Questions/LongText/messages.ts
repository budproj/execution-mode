import { defineMessages } from 'react-intl'

type LongTextRoutineFormQuestionMessages = 'inputPlaceHolder' | 'lineBreakInstructionMessage'

export default defineMessages<LongTextRoutineFormQuestionMessages>({
  inputPlaceHolder: {
    defaultMessage: 'Clique para começar a digitar',
    id: '+4HFc4',
    description:
      'This message appears as a placeholder in the input where the user types their response.',
  },
  lineBreakInstructionMessage: {
    defaultMessage: 'para fazer quebra de linha',
    id: '77VQfc',
    description: 'This message appears in the instruction on how to do a line break in the input.',
  },
})
