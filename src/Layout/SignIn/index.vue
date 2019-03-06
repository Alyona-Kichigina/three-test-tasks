<template>
	<div class="wrapper">
		<form
			@submit.prevent="handleSubmit"
			action=""
		>
			<div style="color: red">
				{{ authErrors }}
			</div>
			<div class="form-control">
				<Input
					id="login"
					:value="formPayload.login"
					:validation-errors="validationErrors.login"
					:submit-failed="submitFailed"
					placeholder="Логин"
				/>
				<Input
					id="password"
					:value="formPayload.password"
					:validation-errors="validationErrors.password"
					:submit-failed="submitFailed"
					placeholder="Пароль"
				/>
				<PrimaryButton
					@click="handleSubmit"
					type="button"
				>Войти</PrimaryButton>
			</div>
		</form>
	</div>
</template>

<script>
import { getValidation } from '@/utils/valiadtor'
import Input from '@/components/Fields/InputComponent'
import PrimaryButton from '@/components/Buttons/PrimaryButton'
export default {
  name: 'index',
  data () {
    return {
      formPayload: {
        login: undefined,
        password: undefined
      },
      // объект ошибки валлидации
      validationErrors: {},
      // не выводим ошибку
      submitFailed: false,
      isDomenValid: false,
    }
  },
  // срабатывает при изменениях
  computed: {
    authErrors () {
      // выводим ощибку что неправильно заполнены поля ввода, вызвав объект authState.error
      //return this.$store.getters.authState.error
    },
  },
  methods: {
    // при нажатии на кнопку
    handleSubmit () {
      // обязательные поля для заполнения
      const rules = {
        login: 'required',
        password: 'required'
      }
      // вызываем проверку валидации
      getValidation(this.formPayload, rules, { onFail: this.handleSubmitFail, onSuccess: this.submitForm })
    },
    // функция при ошибке валидации
    handleSubmitFail (e) {
      // выводим ошибку
      this.submitFailed = true
      // выводим текст ошибки
      this.validationErrors = e
    },
    // функция если валидация прошла успешно
    submitForm () {
      // не выводим ошибку
      this.submitFailed = false
      // очищаем объект ошибки
      this.validationErrors = {}
    },
  },
	components: {
    Input, PrimaryButton
	}
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
