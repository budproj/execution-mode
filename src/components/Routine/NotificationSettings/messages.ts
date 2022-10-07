import { defineMessages } from 'react-intl'

type CreateFormMessage =
  | 'routineNotificationSettingIcon'
  | 'routineNotificationSettingTitle'
  | 'routineNotificationSettingSubtitle'
  | 'routineNotificationDescriptionTitle'
  | 'routineNotificationDescriptionSubtitle'
  | 'routineNotificationButton'

export default defineMessages<CreateFormMessage>({
  routineNotificationSettingIcon: {
    defaultMessage: 'Lembretes de rotina',
    id: 'vqeE5J',
    description: 'Description for routine notification settings modal icon',
  },
  routineNotificationSettingTitle: {
    defaultMessage: 'Ative os lembretes para essa rotina!',
    id: 'mxk1xU',
    description: 'Routine notification settings modal title',
  },

  routineNotificationSettingSubtitle: {
    defaultMessage:
      'Rotinas da empresa estão sempre disponíveis para quem quiser responder, mas líderes podem desativar os lembretes para tornar as respostas opcionais em seu time.',
    id: 'j8vYyP',
    description: 'Routine notification settings modal subtitle',
  },

  routineNotificationDescriptionTitle: {
    defaultMessage: 'Lembretes de Rotina',
    id: 'QP2ffL',
    description: 'Routine notification settings description title',
  },

  routineNotificationDescriptionSubtitle: {
    defaultMessage:
      'O Bud enviará lembretes para este time por email e por notificações para que todos respondam.',
    id: 'gMArPa',
    description: 'Routine notification settings description subtitle',
  },

  routineNotificationButton: {
    defaultMessage: 'Ok',
    id: 'B17Dy1',
    description: 'Routine notification settings modal button label',
  },
})
