<template>
  <form
    action=""
    @submit.prevent="handleSubmit"
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
        when-focused-placeholder="example@publicismedia.ru"
        placeholder="Логин"
      />
      <Input
        id="password"
        :value="formPayload.password"
        :validation-errors="validationErrors.password"
        :submit-failed="submitFailed"
        when-focused-placeholder="your pass"
        placeholder="Пароль"
        type="password"
      />
      <PrimaryButton
        type="button"
        @click="handleSubmit"
      >
        Войти
      </PrimaryButton>
    </div>
  </form>
</template>

<script>
import { getValidation } from '@/utils/validator'
import Input from '@/components/Fields/InputComponent'
import PrimaryButton from '@/components/Buttons/PrimaryButton'

export default {
  name: 'Index',
  components: {
    Input, PrimaryButton,
  },
  data () {
    return {
      formPayload: {
        login: undefined,
        password: undefined,
      },
      validationErrors: {},
      submitFailed: false,
      isDomenValid: false,
    }
  },
  computed: {
    authErrors () {
      // выводим ощибку что неправильно заполнены поля ввода, вызвав объект authState.error
      // return this.$store.getters.authState.error
    },
  },
  methods: {
    handleSubmit () {
      const rules = {
        login: 'required',
        password: 'required',
      }
      getValidation(this.formPayload, rules, { onFail: this.handleSubmitFail, onSuccess: this.submitForm })
    },
    handleSubmitFail (e) {
      this.submitFailed = true
      this.validationErrors = e
    },
    submitForm () {
      this.submitFailed = false
      this.validationErrors = {}
    },
  },
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
