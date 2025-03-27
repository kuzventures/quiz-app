<template>
  <div class="quiz-question mt-5">
    <div class="d-flex align-items-start mb-4">
      <h1 class="me-3 mb-0">{{ index + 1 }}</h1>
      <h6 class="question-text mb-0 mt-2">{{ question.text }}</h6>
    </div>
    <div class="options-list">
      <button
        v-for="(option, idx) in question.options"
        :key="idx"
        :class="[
          'option-button btn w-100 d-flex align-items-center mb-3',
          { selected: selected === idx }
        ]"
        @click="$emit('select', question.id, idx)"
      >
        <span class="option-index">
          {{ String.fromCharCode(65 + idx) }}
        </span>

        <span class="text-start">{{ option }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizQuestion',
  props: {
    question: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    selected: {
      type: Number,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/utilities/css/vars/vars.scss';

.quiz-question {
  max-width: 600px;
  padding: 1.5rem;
  border-radius: 8px;
}

.question-text {
  margin-bottom: 1.5rem;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 420px;
}

.option-button {
  padding: 14px;
  border: 2px solid $GRAY7;
  border-radius: 8px;
  cursor: pointer;
  background: $WHITE;
  text-align: left;
  transition: 0.3s;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.option-index {
  width: 28px;
  height: 28px;
  border: 2px solid $GRAY7;
  border-radius: 50%;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 14px;
  text-transform: uppercase;
}

.option-button:hover,
.option-button.selected {
  background-color: #edfdfe;
  border-color: $BLUE_FOCUS;

  .option-index {
    border-color: $TEAL;
    background-color: rgba($TEAL, 0.2);
  }
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
