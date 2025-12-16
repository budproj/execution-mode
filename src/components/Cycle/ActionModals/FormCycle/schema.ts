import * as Yup from 'yup'

import { CYCLE_STATUS, CADENCE } from 'src/components/Cycle/constants'

export const NewCycleSchema = Yup.object().shape({
  period: Yup.string().required(),
  active: Yup.mixed().oneOf(Object.values(CYCLE_STATUS)).required(),
  cadence: Yup.mixed().oneOf(Object.values(CADENCE)).required(),
  parentId: Yup.string().nullable(),
  dateStart: Yup.date()
    .required()
    .test(
      'is-not-before-end',
      'A data de início não pode ser anterior à data de fim.',
      function (dateStart) {
        const dataFimValue = this.parent.dateEnd
        return dateStart <= dataFimValue
      },
    ),
  dateEnd: Yup.date()
    .required()
    .test(
      'is-not-after-start',
      'A data de fim não pode ser posterior à data de início.',
      function (dateEnd) {
        const dataInicioValue = this.parent.dateStart
        return dateEnd >= dataInicioValue
      },
    ),
})
