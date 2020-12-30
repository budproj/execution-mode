import { MessageDescriptor, defineMessages } from 'react-intl'

type SliderWithHoverThumbMessages = 'updateLabel'

export default defineMessages({
  updateLabel: {
    defaultMessage: 'Atualizar',
    id: '+r5To1',
    description: 'This message is displayed in a tooltip above the SliderThumb on our sliders',
  },
}) as Record<SliderWithHoverThumbMessages, MessageDescriptor>
