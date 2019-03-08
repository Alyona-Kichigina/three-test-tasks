export default {
  props: {
    label: String,
    value: String,
    id: String,
    placeholder: String,
    whenFocusedPlaceholder: String,
    submitFailed: Boolean,
    changeDocValue: Function,
    validationErrors: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      touched: false,
      focused: false,
      changed: false,
    }
  },
  methods: {
    handleBlur () {
      this.touched = true
      this.changed = true
      this.focused = false
    },
    handleFocus () {
      this.focused = true
    },
  },
  watch: {
    submitFailed (newVal) {
      if (newVal) {
        this.changed = false
        this.touched = true
      }
    },
  },
}
