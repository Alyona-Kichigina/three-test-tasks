<template>
	<form
		@submit.prevent="handleSubmit"
		action=""
	>
		<div style="color: red">
			{{ authErrors }}
		</div>
		<div class="form-control">
			<Input
				id="email"
				:value="formPayload.email"
				:validation-errors="validationErrors.email"
				:submit-failed="submitFailed"
				placeholder="Email"
			/>
			<Input
				id="passwordRegistration"
				:value="formPayload.password"
				:validation-errors="validationErrors.password"
				:submit-failed="submitFailed"
				placeholder="Пароль"
			/>
			<PrimaryButton
				@click="handleSubmit"
				type="button"
			>Зарегистрироваться</PrimaryButton>
		</div>
	</form>
</template>

<script>
import { getValidation } from '@/utils/validator';
import Input from '@/components/Fields/InputComponent';
import PrimaryButton from '@/components/Buttons/PrimaryButton';

export default {
  name: 'index',
  data() {
    return {
      formPayload: {
        email: undefined,
        password: undefined,
      },
      // объект ошибки валлидации
      validationErrors: {},
      // не выводим ошибку
      submitFailed: false,
      isDomenValid: false,
    };
  },
  // срабатывает при изменениях
  computed: {
    authErrors() {
      // выводим ощибку что неправильно заполнены поля ввода, вызвав объект authState.error
      // return this.$store.getters.authState.error
    },
  },
  methods: {
    // при нажатии на кнопку
    handleSubmit() {
      // обязательные поля для заполнения
      const rules = {
        email: 'required',
        password: 'required',
      };
      // вызываем проверку валидации
      getValidation(this.formPayload, rules, { onFail: this.handleSubmitFail, onSuccess: this.submitForm });
    },
    // функция при ошибке валидации
    handleSubmitFail(e) {
      // выводим ошибку
      this.submitFailed = true;
      // выводим текст ошибки
      this.validationErrors = e;
    },
    // функция если валидация прошла успешно
    submitForm() {
      // не выводим ошибку
      this.submitFailed = false;
      // очищаем объект ошибки
      this.validationErrors = {};
    },
  },
  components: {
    Input, PrimaryButton,
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
