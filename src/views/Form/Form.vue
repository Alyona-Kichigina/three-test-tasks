<template>
  <div class="form-block">
    <div class="container">
      <div class="bg">
        <div class="form-wrapper">
          <h1>Авторизация пользователя</h1>
          <Tab :tab-titles="tabName">
            <SignIn />
            <Registration />
          </Tab>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignIn from '../../Layout/SignIn'
import Registration from '../../Layout/Registration'
import Tab from '@/components/Tab'

export default {
  components: {
    SignIn, Registration, Tab
  },
  data () {
    return {
      tabName: [
        'Вход',
        'Регистрация'
      ]
    }
  },
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
