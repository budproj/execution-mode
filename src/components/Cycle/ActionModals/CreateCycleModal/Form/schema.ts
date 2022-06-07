import * as Yup from 'yup'

import { CYCLE_STATUS, CADENCE } from 'src/components/Cycle/constants'

export const NewCycleSchema = Yup.object().shape({
  period: Yup.string().required(),
  active: Yup.mixed().oneOf(Object.values(CYCLE_STATUS)).required(),
  cadence: Yup.mixed().oneOf(Object.values(CADENCE)).required(),
  parentId: Yup.string().nullable(),
  dateStart: Yup.date().required(),
  dateEnd: Yup.date().required(),
})
