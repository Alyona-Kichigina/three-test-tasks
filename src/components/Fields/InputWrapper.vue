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
      <div
        v-if="submitFailed || (!changed && touched)"
        class="error-container"
      >
        <!--выводим ошибку-->
        {{ validationErrors[0] }}
      </div>
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
};
</script>

<style scoped>
  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .input-wrapper {
    position: relative;
  }
  .error-container {
    /*position: absolute;*/
    /*left: 0;*/
    /*bottom: -17px;*/
    font-size: 0.8571rem;
    color: #FF7979;
    background: #FDEDED;
    padding: 13px;
  }
  .text-muted{
    font-size: 1rem;
  }
  /*label {*/
    /*position:absolute;*/
    /*left: 35%;*/
    /*top: 15px;*/
    /*color: #C4C4C4;*/
    /*font-size: 0.8571rem;*/
    /*transition: all 0.5s ease;*/
    /*pointer-events: none;*/
  /*}*/
  /*input[type=text]:focus + .reportText {*/
    /*display:block;*/
    /*color: black;*/
    /*top: -20px;*/
    /*font-size: 14px;*/
  /*}*/
</style>
