import * as Yup from 'yup'

import { CYCLE_STATUS, CADENCE } from 'src/components/Cycle/constants'

export const CycleSchema = Yup.object().shape({
  period: Yup.string().required(),
  active: Yup.mixed().oneOf(Object.values(CYCLE_STATUS)).required(),
  cadence: Yup.mixed().oneOf(Object.values(CADENCE)).required(),
  parentId: Yup.string().required(),
  dateStart: Yup.date().required(),
  dateEnd: Yup.date().required(),
})
