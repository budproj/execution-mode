import * as Yup from 'yup'

export const NewTaskSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  priority: Yup.string().required(),
  initialDate: Yup.date(),
  dueDate: Yup.date()
    .min(Yup.ref('initialDate'), 'Due date cannot be before initial date')
    .max(new Date(2100, 11, 31), 'Due date cannot be after 2030')
    .required(),
  ownerID: Yup.string().required(),
})
