<template>
  <div class="form-block">
    <div class="container">
      <div class="bg">
        <div class="form-wrapper">
          <h1>Авторизация пользователя</h1>
          <Tab :tabTitles="tabName">
            <SignIn></SignIn>
          </Tab>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignIn from '../../Layout/SignIn';
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
    SignIn, Tab
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
