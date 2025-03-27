<template>
  <button :type="type" :disabled="disabled" :class="{ fullWidth }" @click="handleClick">
    <slot />
  </button>
</template>

<script>
import { THEMES } from './config.js'

export default {
  name: 'BaseButton',
  emits: ['click'],
  props: {
    value: String,
    fullWidth: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      default: 'button' // 'submit' for forms
    },
    theme: {
      type: String,
      default: THEMES.PRIMARY
    }
  },
  computed: {
    themeObj() {
      const themes = {
        [THEMES.PRIMARY]: {
          bg: '#137996',
          hover: '#0c576c',
          color: '#fff'
        },
        [THEMES.SECONDARY]: {
          bg: '#008080',
          hover: '#006666',
          color: '#fff'
        }
      }
      return themes[this.theme.toUpperCase()] || themes[THEMES.PRIMARY]
    }
  },
  methods: {
    handleClick(event) {
      if (this.type !== 'submit') {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/utilities/css/vars/vars.scss';

button {
  background-color: v-bind('themeObj.bg');
  color: v-bind('themeObj.color');
  font-size: large;
  font-family: $FONT_BOLD;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;

  &.fullWidth {
    width: 100%;
  }

  &:hover {
    background-color: v-bind('themeObj.hover');
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover,
    &:active {
      background-color: v-bind('themeObj.bg');
    }
  }
}
</style>
