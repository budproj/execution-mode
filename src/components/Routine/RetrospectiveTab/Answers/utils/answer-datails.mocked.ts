import { AnswerDetails } from '../types'

export const answerDetailsMocked: AnswerDetails = {
  history: [
    {
      id: 'a8e2c5f6-07b8-4015-b423-82ed4ec5bd1d',
      routinePeriodStartDate: new Date(2022, 6, 24),
      routinePeriodFinishDate: new Date(2022, 7, 1),
    },
    {
      id: undefined,
      routinePeriodStartDate: new Date(2022, 7, 1),
      routinePeriodFinishDate: new Date(2022, 8, 1),
    },
    {
      id: 'a8e2c5f6-07b8-4015-b423-82ed4ec5bd1d',
      routinePeriodStartDate: new Date(2022, 7, 8),
      routinePeriodFinishDate: new Date(2022, 8, 8),
    },
    {
      id: 'a8e2c5f6-07b8-4015-b423-82ed4ec5bd1d',
      routinePeriodStartDate: new Date(2022, 7, 15),
      routinePeriodFinishDate: new Date(2022, 8, 24),
    },
    {
      id: 'a8e2c5f6-07b8-4015-b423-82ed4ec5bd1d',
      routinePeriodStartDate: new Date(2022, 7, 22),
      routinePeriodFinishDate: new Date(2022, 9, 1),
    },
  ],
  answers: [
    {
      id: '3cefa988-1ab9-44ef-b349-f7f8a08fa8c4',
      heading: 'Como se sentiu essa semana?',
      type: 'emoji_scale',
      values: [
        { value: '1', timestamp: '2022-07-28' },
        { value: '4', timestamp: '2022-08-05' },
        { value: '4', timestamp: '2022-08-12' },
        { value: '2', timestamp: '2022-08-19' },
        { value: '3', timestamp: '2022-08-26' },
      ],
    },
    {
      id: '373739b6-0e84-4578-acc3-a3996d6710b0',
      heading: 'Qual o principal motivo da sua resposta?',
      type: 'long_text',
      conditional: {
        dependsOn: '3cefa988-1ab9-44ef-b349-f7f8a08fa8c4',
      },
      value: 'Tenho trabalhado demais e me sentido esgotado...',
    },
    {
      id: '5affa7df-bcc5-45f6-918c-aaa70b647028',
      heading: 'O quão produtiva você sente que foi sua semana?',
      type: 'value_range',
      values: [
        { value: '2', timestamp: '2022-07-28' },
        { value: '3', timestamp: '2022-08-05' },
        { value: '1', timestamp: '2022-08-12' },
        { value: '4', timestamp: '2022-08-19' },
        { value: '5', timestamp: '2022-08-26' },
      ],
    },
    {
      id: 'cf762880-5f6a-4e22-8194-68a383688de0',
      heading: 'O que atrapalhou sua produtividade?',
      type: 'long_text',
      conditional: {
        dependsOn: '5affa7df-bcc5-45f6-918c-aaa70b647028',
      },
      value:
        'Até que produzi bastante essa semana, mas mesmo assim não consegui avançar tanto nas minhas tarefas... as terefas que fiz para a Fábia demandam bastante tempo!',
    },
    {
      id: '34130e48-29f8-4457-af8f-0c502e11b534',
      heading: 'Quais foram suas principais conquistas essa semana?',
      type: 'long_text',
      value: 'Continuo a cobrir a licença da \nFábia Consegui avançar um pouco com meus KRs',
    },
    {
      id: '892f7467-8ba5-4458-9f5e-0c6d87e58885',
      heading: 'Quais serão seus focos na semana que vem?',
      type: 'long_text',
      value:
        'Continuar cobrindo a licença da Fábia \nTentar avançar com o relatório de performance \nComeçar a pensar no meu PDI',
    },
    {
      id: 'fee0c37f-e670-481b-bba3-71baa8015fdc',
      heading: 'Você está com alguma barreira ou dificudade?',
      type: 'roadblock',
      values: [
        { value: 'n', timestamp: '2022-07-28' },
        { value: 'n', timestamp: '2022-08-05' },
        { value: 'n', timestamp: '2022-08-12' },
        { value: 'y', timestamp: '2022-08-19' },
        { value: 'y', timestamp: '2022-08-26' },
      ],
    },
    {
      id: 'b9ad0318-377e-48d6-a305-9f6b5a914447',
      heading: 'Qual sua barreia?',
      type: 'long_text',
      conditional: {
        dependsOn: 'fee0c37f-e670-481b-bba3-71baa8015fdc',
      },
      value:
        'Está bastante pesado para mim cobrir a Fábia sozinho, e sinto que não estou conseguindo dar conta das minhas responsabilidades...',
    },
    {
      id: '7d0a1d46-27de-485d-9d86-44c0d1c09b9f',
      heading: 'Algum recado para o time?',
      type: 'long_text',
      value: 'Help!',
    },
  ],
}
