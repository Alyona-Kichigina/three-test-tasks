import Validator from 'validatorjs'
const messages = {
  required: 'Поле обязательно к заполнению',
}
export function getValidation (values, rules, options = {}) {
  // если не передается функция onFail или onSuccess, то по умолчанию в ней будет null
  const { onFail = () => null, onSuccess = () => null } = options
  // вызываем функцию класса
  const validation = new Validator(values, rules, messages)
  // если валидация не прошла
  if (validation.fails()) {
    // вызываем функцию и в нее передаем ошибку
    onFail(validation.errors.all())
    throw Error(validation.errors.all())
  }
  // вызываем эту функцию если валидация прошла успешно
  onSuccess(values)
  return {}
}
