export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues
  }
}

export const createArrayOfFormElements = (formElements) => {
  const formElementsArray = [];
  for (var key in formElements) {
    formElementsArray.push({
      id: key,
      config: formElements[key]
    })
  }

  return formElementsArray;
}