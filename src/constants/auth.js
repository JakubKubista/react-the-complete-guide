export const LOGIN_FORM = {
  email: {
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'E-mail'
    },
    value: '',
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },
  password: {
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'Password'
    },
    value: '',
    validation: {
      required: true,
      minLength: 6
    },
    valid: false,
    touched: false
  },
}