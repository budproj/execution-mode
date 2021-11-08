import * as Yup from 'yup'

import { USER_GENDER } from '../../constants'

export const NewUserSchema = Yup.object().shape({
  firstName: Yup.string().min(2).required(),
  lastName: Yup.string().min(2).required(),
  email: Yup.string().email().required(),
  role: Yup.string().min(2),
  gender: Yup.mixed().oneOf(Object.values(USER_GENDER)).required(),
})
