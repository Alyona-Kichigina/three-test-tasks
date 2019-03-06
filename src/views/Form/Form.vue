<template>
  <div class="form-block">
    <div class="container">
      <div class="bg">
        <div class="form-wrapper">
          <h1>Авторизация пользователя</h1>
          <SignIn></SignIn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignIn from '../../Layout/SignIn'
export default {
  components: {
    SignIn
  }
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
