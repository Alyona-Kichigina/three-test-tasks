
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
    whenFocusedPlaceholder: String,
    value: {
      type: [Number, String],
      default: '',
    },
  },
  render (h) {
    return (
      <InputWrapper
        id={this.id}
        label={this.label}
        validation-errors={this.validationErrors}
        submit-failed={this.submitFailed}
        changed={this.changed}
        touched={this.touched}
      >
        <transition enterClass="slide-fade-leave-to" leaveClass="slide-fade-active" enterToClass="slide-fade-active" leaveToClass="slide-fade-leave-to">
          {this.focused ? (
            <span
              class="placeholderFocus"
            >
              {this.$attrs.placeholder}
            </span>
          ) : null}
        </transition>
        {h('input', {
          props: this.$props,
          attrs: {
            ...this.$attrs,
            placeholder: this.focused ? this.whenFocusedPlaceholder : this.$attrs.placeholder
          },
          class: {
            'form-input': true,
            'has-error': this.submitFailed
          },
          on: {
            ...this.events,
            blur: this.handleBlur,
            focus: this.handleFocus,
          }
        })}
      </InputWrapper>
    )
  }
}
</script>
<style lang="scss">
  .placeholderFocus {
    position: absolute;
    font-size: 10px;
    color: $grey-medium;
    background: $white;
    top: -6px;
    left: 15px;
    padding-left: 3px;
    padding-right: 3px;
    transition: opacity .4s ease-in-out;
  }
  .form-input {
    background: $white;
    border: 1px solid $grey-light;
    border-radius: 4px;
    padding: 14px 20px;
    color: $grey-medium;
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
