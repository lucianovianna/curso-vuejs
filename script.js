Vue.filter('ucwords', (valor) => {
    return valor.charAt(0).toUpperCase() + valor.slice(1);
}); // filtro global

Vue.component('titulo', {
    template: `
    <div class="row">
        <h2>Campeonato Brasileiro - Série A - 2018</h2>
    </div>
    `,
});

Vue.component('clube', {
    props: ['time', 'invertido'],
    template: `
    <div style="display: flex; flex-direction: row">
        <img :src="time.escudo" class="escudo" alt="" :style="{order : (invertido == 'true') ? 2 : 1}">
        <span :style="{order : (invertido == 'true') ? 1 : 2}"> 
            {{ time.nome | ucwords }} 
        </span>
    </div>
    `
});

Vue.component('clubes-rebaixados', {
    props: ['times'],
    template: `
    <div>
        <h3>Times na zona de rebaixamento</h3>
        <ul>
            <li v-for="time in timesRebaixados">
                <clube :time="time"></clube>
            </li>
        </ul>
    </div>
    `,
    computed: {
        timesRebaixados() {
            return this.times.slice(16, 20);
        },
    },
});

Vue.component('clubes-libertadores', {
    props: ['times'],
    template: `
    <div>
        <h3>Times classificados para Libertadores</h3>
        <ul>
            <li v-for="time in timesLibertadores">
                <clube :time="time"></clube>
            </li>
        </ul>
    </div>
    `,
    computed: {
        timesLibertadores() {
            return this.times.slice(0, 6);
        },
    },
});

Vue.component('tabela-clubes', {
    props: ['times'],
    data() {
        return {
            ordem: {
                colunas: ['pontos', 'saldo', 'gm', 'gs'],
                orientacao: ['desc', 'desc', 'desc', 'asc'],
            },
            busca: '',
        }
    },
    template: `
    <div>
        <input type="text" class="form-control" v-model="busca">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th v-for="(coluna, indice) in ordem.colunas">
                        <a href="#" @click.prevent="ordenar(indice)">
                            {{coluna | ucwords}}
                        </a>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(time, indice) in timesFiltrados" :class="{'table-success' : indice<6}" :style="{'font-size': indice<6 ? '17px' : '15px'}">
                    <td>
                        <clube :time="time" invertido="false"></clube>
                    </td>
                    <td>{{ time.pontos }}</td>
                    <td> {{ time.gm }} </td>
                    <td> {{ time.gs }} </td>
                    <td> {{ time.saldo }} </td>
                </tr>
            </tbody>
        </table>
        <clubes-libertadores :times="timesOrdenados"></clubes-libertadores>
        <clubes-rebaixados :times="timesOrdenados"></clubes-rebaixados>
    </div>
    `,
    computed: {
        timesOrdenados() {
            return _.orderBy(this.times, this.ordem.colunas, this.ordem.orientacao);
        },
        timesFiltrados() {
            var self = this;
    
            return _.filter(this.timesOrdenados, function(time) {
                let buscar = self.busca.toLowerCase();
                return time.nome.toLowerCase().indexOf(buscar) >= 0;
            });
        },
    },
    methods: {
        ordenar(indice) {
            this.$set(this.ordem.orientacao, indice, this.ordem.orientacao[indice] == 'desc' ? 'asc' : 'desc');
        },
    }
});



new Vue({
    el: "#app",
    data: {
        visao: 'tabela',
        times: [
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
        novoJogo: {
            casa: {
                time: null,
                gols: 0
            },
            fora: {
                time: null,
                gols: 0
            }
        },
    },
    methods: {
        criarNovoJogo() {
            let indiceCasa = Math.floor(Math.random() * 20);
            let indiceFora = Math.floor(Math.random() * 20);

            this.novoJogo.casa.time = this.times[indiceCasa];
            this.novoJogo.casa.gols = 0;

            this.novoJogo.fora.time = this.times[indiceFora];
            this.novoJogo.fora.gols = 0;

            this.visao = 'placar';
        },
        fimJogo() {
            let golsMarcados = parseInt(this.novoJogo.casa.gols);
            let golsSofridos = parseInt(this.novoJogo.fora.gols);

            let timeAdversario = this.novoJogo.fora.time;
            let timeCasa = this.novoJogo.casa.time;

            timeCasa.fimJogo(timeAdversario, golsMarcados, golsSofridos);

            this.visao = 'tabela';
        },
    },
    filters: {
        saldo(time) {
            return time.gm - time.gs;
        },
    },
});