<template>
  <div class="quiz_container">
    <!-- Quiz Loaded and Has Questions -->
    <div v-if="quiz">
      <QuizStartScreen v-if="quizState === QUIZ_STATES.START" :quiz="quiz" @start="start" />
      <QuizQuestionsScreen v-if="quizState === QUIZ_STATES.QUESTIONS" :quiz="quiz" />
    </div>

    <!-- Quiz Loaded but Has No Questions -->
    <div
      v-else-if="quiz && quiz.questions.length === 0"
      class="d-flex flex-column justify-content-center align-items-center text-center"
      style="min-height: 70vh"
    >
      <h4>This quiz has no questions.</h4>
      <p>Please check back later or contact support.</p>
    </div>

    <!-- Quiz Still Loading -->
    <div v-else class="d-flex justify-content-center align-items-center" style="min-height: 70vh">
      <b-spinner label="Loading..." />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import QuizStartScreen from './startScreen/QuizStartScreen.vue'
import QuizQuestionsScreen from '@/components/screens/features/quiz/questionsScreen/QuizQuestionsScreen.vue'

const QUIZ_STATES = {
  START: 'start',
  QUESTIONS: 'questions',
  RESULT: 'result'
}

export default {
  name: 'Quiz',
  components: {
    QuizStartScreen,
    QuizQuestionsScreen
  },
  setup() {
    const quizStore = useQuizStore()
    const quiz = computed(() => quizStore.questions)
    const quizState = ref(QUIZ_STATES.START)
    const loading = computed(() => quizStore.loading)
    const error = computed(() => quizStore.error)

    onMounted(async () => {
      try {
        await quizStore.fetchQuiz()
        console.log('Quiz loaded:', quiz.value.name, quiz.value.questions.length, 'questions')
      } catch (error) {
        console.error('Failed to fetch quiz questions:', error)
      }
    })

    const start = () => {
      quizState.value = QUIZ_STATES.QUESTIONS
    }

    return {
      quiz,
      loading,
      error,
      quizState,
      QUIZ_STATES,
      start
    }
  }
}
</script>

<style lang="scss" scoped>
.quiz_container {
  padding: 20px;
}
</style>
