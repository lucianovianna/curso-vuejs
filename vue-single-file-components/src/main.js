import Vue from 'vue'
import App from './App.vue'
import Titulo from './components/Titulo.vue'

Vue.config.productionTip = false

Vue.component('titulo', Titulo);

new Vue({
  render: h => h(App),
}).$mount('#app')
