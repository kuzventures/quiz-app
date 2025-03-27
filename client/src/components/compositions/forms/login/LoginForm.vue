<template>
  <form class="login_form" @submit.prevent="submit">
    <BaseInput v-model="email" label="Email" type="email" :error="errors.email" />
    <BaseInput
      v-model="password"
      label="Password"
      type="password"
      :error="errors.password"
      toggleMask
    />
    <BaseButton type="submit" fullWidth>Log in</BaseButton>
    <p v-if="formError" class="form_error">{{ formError }}</p>
  </form>
</template>

<script>
import BaseInput from '@/components/base/input/BaseInput.vue'
import BaseButton from '@/components/base/button/BaseButton.vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginForm',
  components: {
    BaseInput,
    BaseButton
  },
  data() {
    return {
      email: '',
      password: '',
      errors: {
        email: '',
        password: ''
      },
      formError: ''
    }
  },
  setup() {
    const userStore = useUserStore()
    const router = useRouter()

    return { userStore, router }
  },
  methods: {
    validateFields() {
      this.errors.email = this.email.trim() ? '' : 'Email is required'
      this.errors.password = this.password.trim() ? '' : 'Password is required'
      return !this.errors.email && !this.errors.password
    },
    async submit() {
      const isValid = this.validateFields()

      if (!isValid) {
        return
      }

      await this.userStore.login(this.email, this.password, success => {
        if (success) {
          this.router.push('/acceleration/quiz')
        } else {
          this.formError = 'Invalid email or password'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/utilities/css/vars/vars.scss';
.login_form {
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: $ESSENTIALS_BLUE2;
  margin-block-start: 50px;
}

.form_error {
  color: $INCORRECT;
  font-size: 0.9rem;
  margin-top: -10px;
  text-align: center;
}
</style>
