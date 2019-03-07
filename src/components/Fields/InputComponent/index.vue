<template>
  <!--компонент который показывает ошибку-->
  <InputWrapper
    :id="id"
    :label="label"
    :validation-errors="validationErrors"
    :submit-failed="submitFailed"
    :changed="changed"
    :touched="touched"
  >
    <input
      :id="id"
      :class="submitFailed && 'has-error'"
      :placeholder="placeholder"
      :value="value"
      v-on="_events"
      @blur="handleBlur"
    >
  </InputWrapper>
</template>
<script>
import InputWrapper from '../InputWrapper.vue';
import InputMixin from '../../../mixins/InputMixin.js';

export default {
  name: 'InputDoc',
  components: {
    InputWrapper,
  },
  mixins: [InputMixin],
  props: {
    value: {
      type: [Number, String],
      default: '',
    },
  },
};
</script>
<style lang="scss">
  input {
    background: $white;
    border: 1px solid $border-color;
    border-radius: 4px;
    padding: 14px 20px;
    color: $grey;
    font-size: 0.8571rem;
    /*width: 100%;*/
    /*display: block;*/
    &:focus {
      border-bottom: 1px solid $yellow;
    }
  }
  .has-error {
    .el-input__inner{
      border-color: #fc4b6c;
    }
  }
</style>
