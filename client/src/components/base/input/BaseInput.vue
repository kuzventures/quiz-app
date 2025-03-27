<template>
  <div class="input_container">
    <label class="label">{{ label }}:</label>

    <div class="input_wrapper">
      <input
        class="input_field_p"
        :type="isPassword && showPassword ? 'text' : type"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
      />

      <component
        :is="showPassword ? 'EyeHide' : 'EyeShow'"
        class="eye_icon"
        v-if="type === 'password'"
        @click="togglePassword"
      />
    </div>

    <p v-if="error" class="error_text">{{ error }}</p>
  </div>
</template>

<script>
import EyeShow from '@/assets/icons/eye-password-show.svg'
import EyeHide from '@/assets/icons/eye-password-hide.svg'

export default {
  components: { EyeShow, EyeHide },
  name: 'BaseInput',
  emits: ['update:modelValue'],
  props: {
    modelValue: String,
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: 'Label'
    },
    placeholder: String,
    error: String
  },
  data() {
    return {
      showPassword: false
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    }
  },
  computed: {
    eyeShow() {
      return eyeShow
    },
    eyeHide() {
      return eyeHide
    },
    isPassword() {
      return this.type === 'password'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/utilities/css/vars/vars.scss';

.input_container {
  width: 100%;
}

.label {
  font-family: $FONT_BOLD;
  font-size: large;
  margin-bottom: 4px;
  display: block;
}

.input_wrapper {
  position: relative;
}

.input_field_p {
  width: 100%;
  border: $BORDER;
  border-radius: 6px;
  font-size: 18px;
  height: 38px;
  outline: none;
  padding-inline-start: 6px;
  padding: 8px;

  &:focus-visible {
    box-shadow:
      0 0 0 2px $WHITE,
      0 0 0 4px $BLUE_FOCUS;
  }
}

.eye_icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  height: 18px;
  width: 18px;
  cursor: pointer;
}
</style>
