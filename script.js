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
                colunas: ['pontos', 'gm', 'gs', 'saldo'],
                orientacao: ['desc', 'desc', 'asc', 'desc'],
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

Vue.component('novo-jogo', {
    props: ['timeCasa', 'timeFora'],
    data() {
        return {
            golsCasa: 0,
            golsFora: 0,
        }
    },
    template: `
    <form class="form-inline">
        <input type="text" class="form-control col-md-1" v-model="golsCasa">

        <clube :time="timeCasa" invertido="false" v-if="timeCasa"></clube>

        <span><img src="https://freepikpsd.com/wp-content/uploads/2019/10/letra-x-png-2-1-Transparent-Images.png" width="14" height="14" alt="X"></span>
        
        <clube :time="timeFora" invertido="true" v-if="timeFora"></clube>
        
        <input type="text" class="form-control col-md-1" v-model="golsFora">

        <button type="button" class="btn btn-primary" @click="fimJogo">Fim de Jogo</button>
    </form>
    `,
    methods: {
        fimJogo() {
            var golsMarcados = parseInt(this.golsCasa);
            var golsSofridos = parseInt(this.golsFora);

            this.timeCasa.fimJogo(this.timeFora, golsMarcados, golsSofridos);

            // emitindo um evento para avisar q o 'fim-jogo'
            this.$emit('fim-jogo');
        },
    }
});

Vue.component('my-app', {
    data() {
        return {
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
            timeCasa: null,
            timeFora: null,
            visao: 'tabela'
        }
    },
    template: `
    <div class="container">
        <titulo></titulo>

        <div class="row">
            <div class="col-md-12">
                <button class="btn btn-primary" @click="criarNovoJogo">Novo Jogo</button>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-12" v-if="visao != 'tabela'">
                <novo-jogo :time-casa="timeCasa" :time-fora="timeFora" @fim-jogo="showTabela()"></novo-jogo>
            </div>
            <div class="col-md-12" v-else>
                <tabela-clubes :times="times"></tabela-clubes>
            </div>
        </div>
    </div>
    `,
    methods: {
        criarNovoJogo() {
            let indiceCasa = Math.floor(Math.random() * 20);
            let indiceFora = Math.floor(Math.random() * 20);

            this.timeCasa = this.times[indiceCasa];
            this.timeFora = this.times[indiceFora];

            this.visao = 'placar';
        },
        showTabela() {
            this.visao = 'tabela';
        },
    },
});


new Vue({
    el: "#app",
    template: `<my-app></my-app>`,
    data: {},
    methods: {},
    filters: {},
});