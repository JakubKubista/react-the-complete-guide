/* GENERAL */

export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues
  }
};

/* FORMS AND VALIDATIONS */

export const createArrayOfFormElements = (formElements) => {
  const formElementsArray = [];
  for (var key in formElements) {
    formElementsArray.push({
      id: key,
      config: formElements[key]
    })
  }

  return formElementsArray;
};

export const isElementValid = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required && isValid) {
    isValid = value.trim() !== '';
  }

  if (rules.minLength && isValid) {
    isValid = rules.minLength <= value.length;
  }

  if (rules.maxLength && isValid) {
    isValid = rules.maxLength >= value.length;
  }

  if (rules.type && isValid) {
    isValid = rules.type === 'number' && !isNaN(value);
  }

  return isValid;
};

export const isFormValid = ({form}) => {
  let validity = true;
  for (var inputName in form) {
    validity = form[inputName].valid && validity;
  }

  return validity;
};

export const updateValidatedForm = ({form, inputName, inputValue}) => {
  return {
    ...form,
    [inputName]: {
      ...form[inputName],
      value: inputValue,
      valid: isElementValid(inputValue, form[inputName].validation),
      touched: true
    }
  }
}