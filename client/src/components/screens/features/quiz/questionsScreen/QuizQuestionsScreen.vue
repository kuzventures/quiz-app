<template>
  <Navigator :items="items" />
  <QuizQuestion
    v-if="currentQuestion"
    :question="currentQuestion"
    :index="currentIndex"
    :total="total"
    :selected="selectedAnswer"
    @select="selectAnswer"
    @next="nextQuestion"
    @prev="prevQuestion"
  />
  <Footer
    v-bind:isAnswerSelected="selectedAnswer != null"
    :showBack="currentIndex > 0"
    :index="currentIndex"
    @next="nextQuestion"
    @prev="prevQuestion"
  />
</template>

<script>
import Navigator from '@/components/compositions/navigator/Navigator.vue'
import Footer from '@/components/compositions/footer/Footer.vue'
import QuizQuestion from '@/components/compositions/quiz/QuizQuestion.vue'
import TopicAvatar from '@/assets/topic_avatar.svg?url'

export default {
  name: 'QuizQuestionsScreen',
  components: { Navigator, Footer, QuizQuestion, TopicAvatar },
  props: {
    quiz: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentIndex: 0,
      answers: {}
    }
  },
  computed: {
    currentQuestion() {
      return this.quiz.questions?.[this.currentIndex] || null
    },
    total() {
      return this.quiz.questions?.length || 0
    },
    selectedAnswer() {
      return this.answers[this.currentQuestion?.id] || null
    },
    items() {
      return [
        { text: 'Acceleration', to: '', img: TopicAvatar },
        { text: 'Quiz', to: '' }
      ]
    }
  },
  methods: {
    selectAnswer(questionId, optionId) {
      this.answers[questionId] = optionId
    },
    nextQuestion() {
      if (this.currentIndex < this.total - 1 && this.selectedAnswer !== null) {
        this.currentIndex++
      }
    },
    prevQuestion() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
