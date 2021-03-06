import { defineMessages } from 'react-intl'

type ObjectiveAccordionItemMessage =
  | 'calendarIconTitle'
  | 'calendarIconDesc'
  | 'progressTagLabel'
  | 'progressTagTooltip'
  | 'progressTooltip'
  | 'cancelButtonDesc'
  | 'submitButtonDesc'
  | 'submitToastMessage'
  | 'unexpectedErrorToastMessage'
  | 'requiredFieldError'
  | 'invalidIconDesc'

export default defineMessages<ObjectiveAccordionItemMessage>({
  calendarIconTitle: {
    defaultMessage: 'O prazo deste objetivo',
    id: '/2GFGI',
    description:
      'The title text of our calendar icon in our objective accordion, it is displayed when an user hover the icon itself',
  },

  calendarIconDesc: {
    defaultMessage: 'Um ícone de calendário. Ele indica que nesse campo fica o prazo do objetivo',
    id: 'SpAXmO',
    description:
      'The alternative text explaining our calendar icon in the objective accordion item',
  },

  progressTagLabel: {
    defaultMessage: 'Essa semana:',
    id: '02eAuB',
    description:
      'The text displayed as a prefix in our progress tag label in the team objective accordion button',
  },

  progressTagTooltip: {
    defaultMessage: 'Progresso do objetivo acumulado na semana',
    id: 'gm1hfm',
    description: 'This tooltip explains regarding our progress tag',
  },

  progressTooltip: {
    defaultMessage:
      'O progresso do objetivo é calculado pela média de evolução dos seus resultados-chave. É preciso atingir todos esses resultados para alcançar o objetivo. Por isso, a cor desse indicador reflete a menor confiança entre seus resultados-chave.',
    id: 'kFrglO',
    description: 'This tooltip explains how the progress of the objective is calculated',
  },

  cancelButtonDesc: {
    defaultMessage:
      'Um botão com um ícone de X. Ao clicar nele você irá cancelar a atualização do objetivo',
    id: 'npWxt7',
    description:
      'This text is displayed inside the objective accordion at the team page. It is used by screen readers to explain the cancel button',
  },

  submitButtonDesc: {
    defaultMessage:
      'Um botão com um ícone de confirmação. Ao clicar nele você irá salvar sua atualização do objetivo',
    id: 'xfx/rc',
    description:
      'This text is displayed inside the objective accordion at the team page. It is used by screen readers to explain the check button',
  },

  submitToastMessage: {
    defaultMessage: 'Objetivo atualizado com sucesso',
    id: 'B3oV9s',
    description:
      'This text is displayed as a toast when the user clicks on the check button to update a given objective title',
  },

  unexpectedErrorToastMessage: {
    defaultMessage: 'Desculpe, mas aconteceu um erro inesperado. Tente novamente mais tarde',
    id: 'BipZgy',
    description:
      'This text is displayed as a toast when the user tries to update an objective but an error occur',
  },

  requiredFieldError: {
    defaultMessage: 'Este campo precisa conter algum valor',
    id: 'NMWZmv',
    description:
      'This text is used inside the update objective fields when the user tries to make blank a given required field',
  },

  invalidIconDesc: {
    defaultMessage: 'Um ícone de X indicando que os dados neste campo não são válidos',
    id: 't3VVHw',
    description:
      'This is used by screen readers to explain the X that appears when the users types a non-valid data in a given controlled field',
  },
})
