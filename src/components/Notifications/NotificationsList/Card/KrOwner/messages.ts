import { defineMessages } from 'react-intl'

type KrOwnerMessagesProperties =
  | 'describeNotificationFirstPart'
  | 'describeNotificationSecondPart'
  | 'describeNotificationThirdPart'

export default defineMessages<KrOwnerMessagesProperties>({
  describeNotificationFirstPart: {
    defaultMessage: 'Atenção! Você foi marcado como',
    id: 'hX8RAc',
    description: 'This message appears as describe on notification where a user is marked as owner',
  },
  describeNotificationSecondPart: {
    defaultMessage: 'responsável',
    id: 'bEPnHR',
    description: 'This message appears as describe on notification where a user is marked as owner',
  },
  describeNotificationThirdPart: {
    defaultMessage: 'por um resutado-chave, confira:',
    id: 'yP9yyI',
    description: 'This message appears as describe on notification where a user is marked as owner',
  },
})
