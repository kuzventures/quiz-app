<template>
  <div class="login_container">
    <LoginScreen />
  </div>
</template>

<script>
// SCREEN
import LoginScreen from '@/components/screens/login/LoginScreen.vue'

export default {
  name: 'Login',
  components: {
    LoginScreen
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  height: 100vh;
}
.login_content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 782px;
  background: #fff;
  box-shadow: 0px 4px 4px 3px rgba(185, 185, 185, 0.2509803922);
  flex-direction: column;
  padding: 35px 0;
  height: -webkit-fill-available;
}
</style>
