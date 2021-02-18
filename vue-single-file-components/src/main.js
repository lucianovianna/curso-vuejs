import Vue from 'vue'
import App from './App.vue'
import Titulo from './components/Titulo.vue'
import NovoJogo from './components/NovoJogo.vue'
import TabelaClubes from './components/TabelaClubes.vue'
import Time from './time'
import Modal from './components/Modal.vue'
import PlacarModal from './components/PlacarModal.vue'


Vue.config.productionTip = false

Vue.filter('ucwords', (valor) => valor.charAt(0).toUpperCase() + valor.slice(1));

Vue.component('titulo', Titulo);
Vue.component('novo-jogo', NovoJogo);
Vue.component('tabela-clubes', TabelaClubes);
Vue.component('modal', Modal);
Vue.component('placar-modal', PlacarModal);

new Vue({
  render: h => h(App),
  provide() {
    return {
      timesColecao: [
        new Time('palmeiras', 'assets/palmeiras_60x60.png'),
        new Time('internacional', 'assets/internacional_60x60.png'),
        new Time('flamengo', 'assets/flamengo_60x60.png'),
        new Time('Atlético-MG', 'assets/atletico_mg_60x60.png'),
        new Time('Santos', 'assets/santos_60x60.png'),
        new Time('Botafogo', 'assets/botafogo_60x60.png'),
        new Time('Atlético-PR', 'assets/atletico-pr_60x60.png'),
        new Time('Corinthians', 'assets/corinthians_60x60.png'),
        new Time('Grêmio', 'assets/gremio_60x60.png'),
        new Time('Fluminense', 'assets/fluminense_60x60.png'),
        new Time('Bahia', 'assets/bahia_60x60.png'),
        new Time('Chapecoense', 'assets/chapecoense_60x60.png'),
        new Time('São Paulo', 'assets/sao_paulo_60x60.png'),
        new Time('Cruzeiro', 'assets/cruzeiro_60x60.png'),
        new Time('Sport', 'assets/sport_60x60.png'),
        new Time('Ceará', 'assets/ceara_60x60.png'),
        new Time('Vitória', 'assets/vitoria_60x60.png'),
        new Time('Vasco', 'assets/vasco_60x60.png'),
        new Time('América-MG', 'assets/america_mg_60x60.png'),
        new Time('Paraná', 'assets/parana_60x60.png'),
      ],
    }
  },
}).$mount('#app')
