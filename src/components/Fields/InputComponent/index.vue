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
    <transition name="slide-fade">
      <span
        v-if="focused"
        class="placeholderFocus"
      >{{ placeholder }}</span>
    </transition>
    <input
      :attrs="$attrs"
      :id="id"
      :class="submitFailed && 'has-error'"
      :placeholder="focused ? whenFocusedPlaceholder : placeholder"
      :value="value"
      class="form-input"
      v-on="_events"
      @focus="handleFocus"
      @blur="handleBlur"
    >
  </InputWrapper>
</template>
<script>
import InputWrapper from '../InputWrapper.vue'
import InputMixin from '../../../mixins/InputMixin.js'

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
}
</script>
<style lang="scss">
  .placeholderFocus {
    position: absolute;
    font-size: 10px;
    color: $grey;
    background: $white;
    top: -6px;
    left: 15px;
    padding-left: 3px;
    padding-right: 3px;
    transition:all .4s ease
  }
  .form-input {
    background: $white;
    border: 1px solid $border-color;
    border-radius: 4px;
    padding: 14px 20px;
    color: $grey;
    font-size: 0.8571rem;
    width: 100%;
    display: block;
    &:focus {
      border-bottom: 1px solid $yellow;
    }
  }
  .has-error {
    border-bottom-color: $red;
  }

  .slide-fade-active,
  .slide-fade-active {
    opacity: 1;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    opacity: 0;
  }
</style>
