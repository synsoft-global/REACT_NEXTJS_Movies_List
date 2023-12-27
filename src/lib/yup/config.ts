import { setLocale } from 'yup'


export default setLocale({
  mixed: {
    default: (params) => `errorMessage.invalidValue`,
    required: (params) => `errorMessage.required`,
    notType: (params) => `errorMessage.invalidValue`,
    notOneOf: (params) => `errorMessage.invalidValue`,
  },
  string: {
    min: (params) => `errorMessage.invalidValue`,
    max: (params) => `errorMessage.invalidValue`,
    email: (params) => `errorMessage.invalidEmail`,
    matches: (params) => `errorMessage.invalidValue`,
    url: (params) => `errorMessage.invalidURL`,
  },
  number: {
    min: (params) => `errorMessage.invalidValue`,
    max: (params) => `errorMessage.invalidValue`,
    moreThan: (params) => `errorMessage.invalidValue`,
    positive: (params) => `errorMessage.invalidValue`,
  }
})