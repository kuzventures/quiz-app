<template>
  <footer class="quiz_footer">
    <slot name="footer">
      <BaseButton v-if="showBack" :disabled="!isAnswerSelected" @click="$emit('prev')">
        Back
      </BaseButton>
      <BaseButton :disabled="!isAnswerSelected" @click="$emit('next')"> Next </BaseButton>
    </slot>
  </footer>
</template>

<script>
import BaseButton from '@/components/base/button/BaseButton.vue'

export default {
  name: 'Footer',
  components: { BaseButton },
  props: {
    isAnswerSelected: {
      type: Boolean,
      default: false
    },
    showBack: Boolean
  }
}
</script>

<style scoped>
.quiz_footer {
  border-top: 1px solid #e0e0e0;
  position: fixed; /* ✅ use fixed to keep it visible */
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px 16px;
  background: #fff;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  z-index: 10;
}
</style>
