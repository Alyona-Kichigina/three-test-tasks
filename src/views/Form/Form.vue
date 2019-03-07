<template>
  <div class="form-block">
    <div class="container">
      <div class="bg">
        <div class="form-wrapper">
          <h1>Авторизация пользователя</h1>
          <Tab :tabTitles="tabName">
            <SignIn></SignIn>
            <Registration></Registration>
          </Tab>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignIn from '../../Layout/SignIn';
import Registration from '../../Layout/Registration';
import Tab from '@/components/Tab'

export default {
  data () {
    return {
      tabName:[
        'Вход',
        'Регистрация'
      ]
    }
  },
  components: {
    SignIn, Registration, Tab
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
