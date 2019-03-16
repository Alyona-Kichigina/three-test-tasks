<template>
  <div class="input-container">
    <!--лабел инпутам всего компонента поля формы-->
    <label
      class="reportText"
      :for="id"
    >
      {{ label }}
    </label>
    <div class="input-wrapper">
      <!--здесь будем выводить инпут-->
      <slot />
    </div>
    <div
      v-if="submitFailed || (!changed && touched)"
      class="error-container"
    >
      <!--выводим ошибку-->
      {{ validationErrors[0] }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputWrapper',
  props: {
    label: String,
    id: String,
    validationErrors: Array,
    submitFailed: Boolean,
    changed: Boolean,
    touched: Boolean,
  },
}
</script>

<style scoped lang="scss">
  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .input-wrapper {
    position: relative;
    display: flex;
  }
  .error-container {
    font-size: 0.8571rem;
    color: $red;
    background: $red-light;
    padding: 13px;
    margin-top: 4px;
  }
  .text-muted{
    font-size: 1rem;
  }
</style>
