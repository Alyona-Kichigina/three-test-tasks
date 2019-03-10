<template>
  <div id="app">
    <Header />
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view />
    </transition>
    <Footer />
  </div>
</template>

<script>
import Header from './components/header/index'
import Footer from './components/footer'

export default {
  components: {
    Header,
    Footer,
  },
}
</script>
<style src="../node_modules/handsontable/dist/handsontable.full.css"></style>
<style lang="scss">

</style>
