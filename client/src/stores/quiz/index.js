// stores/quiz.js
import { defineStore } from 'pinia'
import { axiosInstance } from '@/plugins/axios'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    questions: [],
    currentIndex: 0,
    answers: {},
    loading: false,
    error: null
  }),
  getters: {
    currentQuestion(state) {
      return state.questions[state.currentIndex] || null
    },
    isAnswered(state) {
      const question = state.questions[state.currentIndex]
      return !!state.answers[question?.id]
    }
  },
  actions: {
    async fetchQuiz() {
      this.loading = true
      try {
        const response = await axiosInstance.get('/quiz')
        if (!response.data || response.data.length === 0) {
          this.error = 'No quiz data found.'
          this.questions = []
        } else {
          this.questions = response.data
        }
      } catch (e) {
        this.error = 'Failed to load quiz.'
      } finally {
        this.loading = false
      }
    },
    selectAnswer(questionId, optionId) {
      this.answers[questionId] = optionId
    },
    nextQuestion() {
      if (this.currentIndex < this.questions.length - 1 && this.isAnswered) {
        this.currentIndex++
      }
    },
    prevQuestion() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    }
  }
})
