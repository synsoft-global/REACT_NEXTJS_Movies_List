import { setLocale } from 'yup'


export default setLocale({
  mixed: {
    default: (params) => `Enter valid value`,
    required: (params) => `Required *`,
    notType: (params) => `Enter valid value`,
    notOneOf: (params) => `Enter valid value`,
  },
  string: {
    min: (params) => `Enter valid value`,
    max: (params) => `Enter valid value`,
    email: 'Enter valid email',
    matches: (params) => `Enter valid value`,
    url: (params) => `Enter valid URL`,
  },
  number: {
    min: (params) => `Enter valid value`,
    max: (params) => `Enter valid value`,
    moreThan: (params) => `Enter valid value`,
    positive: (params) => `Enter valid value`,
  }
})